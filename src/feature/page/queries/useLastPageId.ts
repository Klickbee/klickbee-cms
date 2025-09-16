import { useSuspenseQuery } from "@tanstack/react-query";
import { lastPageIdOptions } from "@/feature/page/options/lastPageIdOptions";

export function useLastPageId() {
	return useSuspenseQuery(lastPageIdOptions);
}
