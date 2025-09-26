"use server";

import { JsonValue } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import { prisma } from "@/lib/prisma";

export const getAllPages = async () => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.page.findMany({
		orderBy: {
			id: "asc",
		},
		select: {
			content: true,
			createdAt: true,
			id: true,
			isPublished: true,
			metaDescription: true,
			metaKeywords: true,
			metaTitle: true,
			parentId: true,
			publishedAt: true,
			slug: true,
			title: true,
			updatedAt: true,
		},
	});
};

export const getPageById = async (id: number) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.page.findUnique({
		select: {
			content: true,
			createdAt: true,
			id: true,
			isPublished: true,
			metaDescription: true,
			metaKeywords: true,
			metaTitle: true,
			parentId: true,
			publishedAt: true,
			slug: true,
			title: true,
			updatedAt: true,
		},
		where: { id },
	});
};

export const createPage = async (data: {
	title: string;
	slug: string;
	content?: JsonValue;
	parentId?: number | null;
}) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.page.create({
		data: {
			content: data.content || {},
			isPublished: false,
			parentId: data.parentId || null,
			slug: data.slug,
			title: data.title,
		},
		select: {
			content: true,
			createdAt: true,
			id: true,
			isPublished: true,
			metaDescription: true,
			metaKeywords: true,
			metaTitle: true,
			parentId: true,
			publishedAt: true,
			slug: true,
			title: true,
			updatedAt: true,
		},
	});
};

export const getLastPageId = async () => {
	return prisma.page
		.findFirst({
			orderBy: {
				id: "desc",
			},
			select: {
				id: true,
			},
		})
		.then((page) => page?.id || 0);
};

export const isHomepage = async (pageId: number) => {
	const homepageSetting = await prisma.settings.findUnique({
		where: { key: "current_homepage_id" },
	});

	return homepageSetting && Number(homepageSetting.value) === pageId;
};

export const deletePages = async (itemIds: string[]) => {
	try {
		const numericIds = itemIds.map((id) => parseInt(id, 10));

		await prisma.page.deleteMany({
			where: {
				id: {
					in: numericIds,
				},
			},
		});

		revalidatePath("/admin/[adminKey]", "layout");
		return true;
	} catch (error) {
		console.error("Error deleting collection items:", error);
		throw new Error("Failed to delete collection items");
	}
};

export async function duplicatePages(itemIds: string[]) {
	try {
		const numericIds = itemIds.map((id) => parseInt(id, 10));

		// Récupérer les éléments à dupliquer
		const itemsToDuplicate = await prisma.page.findMany({
			where: {
				id: {
					in: numericIds,
				},
			},
		});

		// Créer les duplicatas
		const duplicatedItems = await Promise.all(
			itemsToDuplicate.map(async (item) => {
				const {
					id: _id,
					createdAt: _createdAt,
					updatedAt: _updatedAt,
					...itemData
				} = item;
				return prisma.page.create({
					data: {
						...itemData,
						createdAt: new Date(),
						slug: `${item.slug}-copy-${Date.now()}`,
						title: `${item.title} (copie)`,
					},
				});
			}),
		);

		revalidatePath("/admin/[adminKey]", "layout");
		return duplicatedItems;
	} catch (error) {
		console.error("Error duplicating collection items:", error);
		throw new Error("Failed to duplicate collection items");
	}
}
