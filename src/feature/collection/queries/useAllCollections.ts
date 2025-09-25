import { useSuspenseQuery } from "@tanstack/react-query";
import { allCollectionsOptions } from "@/feature/collection/options/allCollectionsOptions";

export function useAllCollections() {
	return useSuspenseQuery(allCollectionsOptions);
}
