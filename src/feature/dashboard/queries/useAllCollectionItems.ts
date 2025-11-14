import { useSuspenseQuery } from "@tanstack/react-query";
import { allCollectionItemsOptions } from "@/feature/dashboard/options/allCollectionItemsOptions";

export function useAllCollectionItems() {
	return useSuspenseQuery(allCollectionItemsOptions);
}
