"use server";
import {
	BuilderComponent,
	ParentBuilderComponent,
} from "@/builder/types/components/components";
import { prisma } from "@/lib/prisma";

// Sanitize builder content before persisting: strip non-serializable fields like React nodes (icon) and functions
function sanitizeBuilderContent(
	content:
		| ParentBuilderComponent
		| BuilderComponent[]
		| BuilderComponent
		| null
		| undefined,
): PrismaJson.PageContentMetaType {
	const seen = new WeakSet<object>();
	const cleanse = (val: unknown): unknown => {
		if (val === null || val === undefined) return val;
		const t = typeof val;
		if (t === "function") return undefined;
		if (t !== "object") return val;
		const obj = val as object;
		if (seen.has(obj)) return undefined;
		seen.add(obj);
		if (Array.isArray(val)) {
			return (val as unknown[])
				.map((v) => cleanse(v))
				.filter((v) => v !== undefined);
		}
		const record = val as Record<string, unknown>;
		const out: Record<string, unknown> = {};
		for (const key of Object.keys(record)) {
			const value = record[key];
			// Preserve icon only if it's a serializable string; drop React nodes or other non-serializable values
			if (key === "icon") {
				if (typeof value === "string") {
					out[key] = value;
				}
				continue;
			}
			const cleaned = cleanse(value);
			if (cleaned !== undefined) out[key] = cleaned;
		}
		return out;
	};
	const cleaned = cleanse(content);
	if (Array.isArray(cleaned)) {
		return cleaned as unknown as PrismaJson.PageContentMetaType;
	}
	if (cleaned && typeof cleaned === "object") {
		return cleaned as unknown as PrismaJson.PageContentMetaType;
	}
	// Ensure we always return a valid JSON object for Prisma
	return {} as PrismaJson.PageContentMetaType;
}

export async function createPageHeader(
	content: ParentBuilderComponent | BuilderComponent[],
	pageId: number,
) {
	const countHeader = await prisma.pageHeader.count();
	const isDefault = countHeader === 0;
	return prisma.pageHeader.create({
		data: {
			content: sanitizeBuilderContent(content),
			pages: {
				connect: { id: pageId },
			},
			isDefault: isDefault,
		},
	});
}

export async function getPageHeader(pageHeaderId: number) {
	return prisma.pageHeader.findUnique({
		where: { id: pageHeaderId },
	});
}

export async function getPageHeaderByPageId(pageId: number) {
	return prisma.pageHeader.findFirst({
		where: {
			pages: {
				some: {
					id: pageId,
				},
			},
		},
	});
}

export async function getDefaultPageHeader() {
	return prisma.pageHeader.findFirst({ where: { isDefault: true } });
}

export async function setHeaderToPage(pageId: number, pageHeaderId: number) {
	return prisma.page.update({
		where: { id: pageId },
		data: {
			pageHeaderId: pageHeaderId,
		},
	});
}

export async function setHeaderAsDefault(pageHeaderId: number) {
	await prisma.pageHeader.updateMany({
		where: {},
		data: {
			isDefault: false,
		},
	});
	return prisma.pageHeader.update({
		where: { id: pageHeaderId },
		data: {
			isDefault: true,
		},
	});
}

export async function updatePageHeader(
	pageHeaderId: number,
	content: BuilderComponent[] | ParentBuilderComponent,
) {
	return prisma.pageHeader.update({
		where: { id: pageHeaderId },
		data: {
			content: sanitizeBuilderContent(content),
		},
	});
}
