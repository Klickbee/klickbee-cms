import { queryOptions } from "@tanstack/react-query";
import { getAllAuthors } from "@/feature/collectionItem/lib/authors";

export const allAuthorsOptions = queryOptions({
	queryFn: async () => await getAllAuthors(),
	queryKey: ["authors"] as const,
	refetchOnWindowFocus: false,
});
