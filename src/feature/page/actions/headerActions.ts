"use server";
import {
	BuilderComponent,
	ParentBuilderComponent,
} from "@/builder/types/components/components";
import prisma from "@/lib/prisma";

// Create a header for a page, optionally linking to a pageId
export async function createHeader(
	content: ParentBuilderComponent,
	pageId?: number,
) {
	return prisma.pageHeader.create({
		data: {
			content: JSON.parse(JSON.stringify(content)),
			...(pageId ? { pages: { connect: { id: pageId } } } : {}),
		},
	});
}

// Update the content of a header by its id
export async function updateHeaderContent(
	id: number,
	content: BuilderComponent[],
) {
	return prisma.pageHeader.update({
		where: { id },
		data: {
			content: JSON.parse(JSON.stringify(content)),
		},
	});
}

// Get a header by pageId, or fallback to the default header
export async function getHeaderByPageId(pageId: number) {
	let header = await prisma.pageHeader.findFirst({
		where: {
			pages: {
				some: {
					id: pageId,
				},
			},
		},
	});

	if (!header) {
		header = await prisma.pageHeader.findFirst({
			where: {
				isDefault: true,
			},
		});
	}
	return header;
}

export async function getHeaderById(pageHeaderId: number) {
	return prisma.pageHeader.findUnique({
		where: { id: pageHeaderId },
	});
}

export async function setAsHeader(
	pageId: number,
	headerId?: number,
	content?: ParentBuilderComponent,
) {
	if (headerId) {
		return prisma.page.update({
			where: { id: pageId },
			data: {
				pageHeaderId: headerId,
			},
		});
	} else if (content) {
		const header = await createHeader(content);
		return await setAsHeader(pageId, header.id);
	}
	throw new Error("Either headerId or content must be provided");
}
