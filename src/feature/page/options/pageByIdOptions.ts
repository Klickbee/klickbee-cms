import { queryOptions } from "@tanstack/react-query";
import { getPageById } from "@/feature/page/lib/pages";

export const pageByIdOptions = (pageId: number) => {
	return queryOptions({
		queryFn: async () => await getPageById(pageId),
		queryKey: ["page", pageId] as const,
	});
};
