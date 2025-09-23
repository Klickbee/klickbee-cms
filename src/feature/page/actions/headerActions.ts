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
