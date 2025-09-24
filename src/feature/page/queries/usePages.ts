import { useSuspenseQuery } from "@tanstack/react-query";
import { allPagesOptions } from "@/feature/page/options/allPagesOptions";

export function usePages() {
	return useSuspenseQuery(allPagesOptions);
}
