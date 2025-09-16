import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMedia } from "../lib/mediaClient";

export function useDeleteMedia() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (filename: string) => {
			return await deleteMedia(filename);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["media"] });
		},
	});
}
