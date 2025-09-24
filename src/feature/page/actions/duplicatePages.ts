"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

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
