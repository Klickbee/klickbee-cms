import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMedia } from "../lib/mediaClient";

export function useUploadMedia() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (file: File) => {
			return await uploadMedia(file);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["media"] });
		},
	});
}
