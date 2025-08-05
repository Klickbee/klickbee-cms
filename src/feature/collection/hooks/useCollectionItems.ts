import { useQuery } from "@tanstack/react-query";
import { CollectionItem } from "../types/collection";

/**
 * Fetches collection items by collection ID
 */
export function useCollectionItemsById(collectionId: number | null) {
	return useQuery<CollectionItem[]>({
		enabled: !!collectionId,
		queryFn: async () => {
			if (!collectionId) return [];

			const response = await fetch(
				`/api/collection-items?collectionId=${collectionId}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch collection items");
			}
			return response.json();
		},
		queryKey: ["collectionItems", "byId", collectionId],
	});
}

/**
 * Fetches collection items by collection slug
 */
export function useCollectionItemsBySlug(slug: string | null) {
	return useQuery<CollectionItem[]>({
		enabled: !!slug,
		queryFn: async () => {
			if (!slug) return [];

			const response = await fetch(
				`/api/collection-items?collectionSlug=${slug}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch collection items");
			}
			return response.json();
		},
		queryKey: ["collectionItems", "bySlug", slug],
	});
}
