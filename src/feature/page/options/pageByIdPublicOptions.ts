import { queryOptions } from "@tanstack/react-query";
import { getPublicPageById } from "@/feature/page/lib/pages";

export const pageByIdPublicOptions = (pageId: number) => {
	return queryOptions({
		queryFn: async () => await getPublicPageById(pageId),
		queryKey: ["public_page", pageId] as const,
	});
};
