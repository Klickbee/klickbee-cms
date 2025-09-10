import { useQuery } from "@tanstack/react-query";
import { getAllPages } from "../lib/pages";

export function usePages() {
	return useQuery({
		queryFn: async () => await getAllPages(),
		queryKey: ["pages"] as const,
	});
}
