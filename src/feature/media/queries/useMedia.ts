import { useQuery } from "@tanstack/react-query";
import { getAllMedia } from "../lib/mediaClient";

export function useMedia() {
	return useQuery({
		queryFn: async () => await getAllMedia(),
		queryKey: ["media"] as const,
	});
}
