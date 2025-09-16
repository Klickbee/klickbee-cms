import { queryOptions } from "@tanstack/react-query";
import { getLastPageId } from "@/feature/page/lib/pages";

export const lastPageIdOptions = queryOptions({
	queryFn: async () => await getLastPageId(),
	queryKey: ["lastPageId"] as const,
});
