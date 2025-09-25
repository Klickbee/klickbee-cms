import { queryOptions } from "@tanstack/react-query";
import { getCollectionItemsByCollectionSlug } from "@/feature/collection/lib/collections";

export const allCollectionItemsBySlugOptions = (collectionSlug: string) =>
	queryOptions({
		queryFn: async () =>
			await getCollectionItemsByCollectionSlug(collectionSlug),
		queryKey: ["collectionItems", "bySlug", collectionSlug] as const,
	});
