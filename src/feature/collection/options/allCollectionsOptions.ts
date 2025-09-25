import { queryOptions } from "@tanstack/react-query";
import { getAllCollections } from "@/feature/collection/lib/collections";

export const allCollectionsOptions = queryOptions({
	queryFn: async () => await getAllCollections(),
	queryKey: ["all_collections"] as const,
});
