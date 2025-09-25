import { useSuspenseQuery } from "@tanstack/react-query";
import { collectionBySlugForEditOptions } from "@/feature/collection/options/collectionBySlugOptions";

export function useCollectionForEdit(collectionSlug: string) {
	return useSuspenseQuery(collectionBySlugForEditOptions(collectionSlug));
}
