import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MediaUpdateSchema } from "@/feature/media/schemas/mediaUpdateSchema";
import type { MediaFile } from "@/feature/media/types/media";

export const useUpdateMedia = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			data: { id: number } & MediaUpdateSchema,
		): Promise<MediaFile> => {
			const response = await fetch("/api/admin/media", {
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
				method: "PUT",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error || "Erreur lors de la mise à jour du média",
				);
			}

			return response.json();
		},
		onSuccess: () => {
			// Invalidate media queries to refresh the list
			queryClient.invalidateQueries({ queryKey: ["media"] });
		},
	});
};
