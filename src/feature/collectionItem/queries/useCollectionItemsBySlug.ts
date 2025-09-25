import { useSuspenseQuery } from "@tanstack/react-query";
import { allCollectionItemsBySlugOptions } from "@/feature/collectionItem/options/allCollectionItemsBySlugOptions";

export const useCollectionItemsBySlug = (collectionSlug: string) => {
	return useSuspenseQuery(allCollectionItemsBySlugOptions(collectionSlug));
};
