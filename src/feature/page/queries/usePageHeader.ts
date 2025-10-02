import { useQuery } from "@tanstack/react-query";
import { getHeaderByPageId } from "@/feature/page/actions/headerActions";

export function usePageHeader(pageId: number) {
	const safePageId = pageId || -1;
	return useQuery({
		queryFn: async () => {
			if (!safePageId || safePageId === -1) return null;
			return await getHeaderByPageId(safePageId);
		},
		queryKey: ["page-header", safePageId] as const,
		enabled: !!safePageId && safePageId !== -1,
	});
}
