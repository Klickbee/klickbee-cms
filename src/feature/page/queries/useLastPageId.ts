import { useQuery } from "@tanstack/react-query";
import { getLastPageId } from "@/feature/page/lib/pages";

export function useLastPageId() {
	return useQuery({
		queryFn: async () => await getLastPageId(),
		queryKey: ["lastPageId"] as const,
	});
}
