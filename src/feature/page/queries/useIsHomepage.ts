import { useQuery } from "@tanstack/react-query";
import { isHomepage } from "../lib/pages";

export function useIsHomepage(pageId: number) {
	return useQuery({
		queryFn: async () => await isHomepage(pageId),
		queryKey: ["isHomepage", pageId],
	});
}
