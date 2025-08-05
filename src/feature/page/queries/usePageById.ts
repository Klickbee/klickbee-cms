import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { pageByIdOptions } from "@/feature/page/options/pageByIdOptions";

export function usePageById(pageId: number) {
	// Always call useSuspenseQuery to maintain hook order consistency
	// but use a safe pageId value and handle empty case in the component
	const safePageId = pageId || -1;
	const result = useSuspenseQuery(pageByIdOptions(safePageId));

	// If pageId was empty, return a default response
	if (!pageId) {
		return { data: undefined, error: null, isLoading: false };
	}

	return result;
}
