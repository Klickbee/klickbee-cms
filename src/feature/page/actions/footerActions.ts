"use server";
import {
	BuilderComponent,
	ParentBuilderComponent,
} from "@/builder/types/components/components";
import prisma from "@/lib/prisma";

// Create a footer for a page, optionally linking to a pageId
export async function createFooter(
	content: ParentBuilderComponent,
	pageId?: number,
) {
	return prisma.pageFooter.create({
		data: {
			content: JSON.parse(JSON.stringify(content)),
			...(pageId ? { pages: { connect: { id: pageId } } } : {}),
		},
	});
}

// Update the content of a footer by its id
export async function updateFooterContent(
	id: number,
	content: BuilderComponent[],
) {
	return prisma.pageFooter.update({
		where: { id },
		data: {
			content: JSON.parse(JSON.stringify(content)),
		},
	});
}

// Get a footer by pageId, or fallback to the default footer
export async function getFooterByPageId(pageId: number) {
	let footer = await prisma.pageFooter.findFirst({
		where: {
			pages: {
				some: {
					id: pageId,
				},
			},
		},
	});

	if (!footer) {
		footer = await prisma.pageFooter.findFirst({
			where: {
				isDefault: true,
			},
		});
	}
	return footer;
}

export async function getFooterById(pageFooterId: number) {
	return prisma.pageFooter.findUnique({
		where: { id: pageFooterId },
	});
}

export async function setAsFooter(
	pageId: number,
	footerId?: number,
	content?: ParentBuilderComponent,
) {
	if (footerId) {
		return prisma.page.update({
			where: { id: pageId },
			data: {
				pageFooterId: footerId,
			},
		});
	} else if (content) {
		const footer = await createFooter(content);
		return await setAsFooter(pageId, footer.id);
	}
	throw new Error("Either footerId or content must be provided");
}
