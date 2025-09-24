"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deletePages(itemIds: string[]) {
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
}
