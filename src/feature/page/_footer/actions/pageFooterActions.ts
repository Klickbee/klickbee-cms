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

export async function createPageFooter(
	content: ParentBuilderComponent | BuilderComponent[],
	pageId: number,
) {
	const countFooter = await prisma.pageFooter.count();
	const isDefault = countFooter === 0;
	return prisma.pageFooter.create({
		data: {
			content: sanitizeBuilderContent(content),
			pages: {
				connect: { id: pageId },
			},
			isDefault: isDefault,
		},
	});
}

export async function getPageFooter(pageFooterId: number) {
	return prisma.pageFooter.findUnique({
		where: { id: pageFooterId },
	});
}

export async function getPageFooterByPageId(pageId: number) {
	return prisma.pageFooter.findFirst({
		where: {
			pages: {
				some: {
					id: pageId,
				},
			},
		},
	});
}

export async function getDefaultPageFooter() {
	return prisma.pageFooter.findFirst({ where: { isDefault: true } });
}

export async function setFooterToPage(pageId: number, pageFooterId: number) {
	return prisma.page.update({
		where: { id: pageId },
		data: {
			pageFooterId: pageFooterId,
		},
	});
}

export async function setFooterAsDefault(pageFooterId: number) {
	await prisma.pageFooter.updateMany({
		where: {},
		data: {
			isDefault: false,
		},
	});
	return prisma.pageFooter.update({
		where: { id: pageFooterId },
		data: {
			isDefault: true,
		},
	});
}

export async function updatePageFooter(
	pageFooterId: number,
	content: BuilderComponent[] | ParentBuilderComponent,
) {
	return prisma.pageFooter.update({
		where: { id: pageFooterId },
		data: {
			content: sanitizeBuilderContent(content),
		},
	});
}
