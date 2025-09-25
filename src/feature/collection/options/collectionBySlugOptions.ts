import { queryOptions } from "@tanstack/react-query";
import { getCollectionBySlug } from "@/feature/collection/lib/collections";

export const collectionBySlugForEditOptions = (collectionSlug: string) =>
	queryOptions({
		queryFn: async () => await getCollectionBySlug(collectionSlug),
		queryKey: ["collection", "edit", collectionSlug] as const,
	});
