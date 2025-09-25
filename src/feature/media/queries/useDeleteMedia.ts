import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMedia } from "../lib/mediaClient";

export function useDeleteMedia() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			return await deleteMedia(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["media"] });
		},
	});
}
