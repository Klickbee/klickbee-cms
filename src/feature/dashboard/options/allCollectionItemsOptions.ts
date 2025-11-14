import { queryOptions } from "@tanstack/react-query";
import { getAllCollectionItems } from "@/feature/dashboard/lib/collectionItem";

export const allCollectionItemsOptions = queryOptions({
	queryFn: async () => await getAllCollectionItems(),
	queryKey: ["all_collection_items"] as const,
});
