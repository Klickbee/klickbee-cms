import { queryOptions } from "@tanstack/react-query";
import { getAllPages } from "@/feature/page/lib/pages";

export const allPagesOptions = queryOptions({
	queryFn: async () => await getAllPages(),
	queryKey: ["pages"] as const,
});
