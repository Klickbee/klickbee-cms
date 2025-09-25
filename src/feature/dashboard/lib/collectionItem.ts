"use server";

import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import prisma from "@/lib/prisma";

export const getAllCollectionItems = async () => {
	const authError = await isAuthenticatedGuard();

	if (authError) {
		return authError;
	}

	const collectionsItems = await prisma.collectionItem.findMany({
		orderBy: {
			createdAt: "desc",
		},
		select: {
			author: true,
			collection: true,
			collectionId: true,
			createdAt: true,
			id: true,
			isPublished: true,
			title: true,
		},
	});

	return collectionsItems.map((item, index) => {
		// Générer un score SEO variable pour la démo
		const seoScores = ["100%", "85%", "60%", "40%", "25%"];
		const seoScore = seoScores[index % seoScores.length];

		return {
			collectionName: item.collection.name,
			collectionSlug: item.collection.slug,
			datePost: item.createdAt,
			id: item.id,
			name: item.title,
			seoScore: seoScore,
			status: item.isPublished ? "Published" : "Draft",
		};
	});
};
