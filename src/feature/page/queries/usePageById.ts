import { useQuery } from "@tanstack/react-query";
import { getPageById } from "@/feature/page/lib/pages";

export function usePageById(pageId: number) {
	const safePageId = pageId || -1;
	return useQuery({
		queryFn: async () => await getPageById(safePageId),
		queryKey: ["page", pageId] as const,
	});
}
