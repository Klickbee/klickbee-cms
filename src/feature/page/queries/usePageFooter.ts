import { useQuery } from "@tanstack/react-query";
import { getFooterByPageId } from "@/feature/page/actions/footerActions";

export function usePageFooter(pageId: number) {
	const safePageId = pageId || -1;
	return useQuery({
		queryFn: async () => {
			if (!safePageId || safePageId === -1) return null;
			return await getFooterByPageId(safePageId);
		},
		queryKey: ["page-footer", safePageId] as const,
		enabled: !!safePageId && safePageId !== -1,
	});
}
