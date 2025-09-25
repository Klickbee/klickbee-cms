import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { deleteCollections } from "../lib/collections";
import { allCollectionsOptions } from "../options/allCollectionsOptions";

export function useDeleteCollections() {
	const queryClient = getQueryClient();

	return useMutation({
		mutationFn: deleteCollections,
		onSuccess: () => {
			queryClient.invalidateQueries(allCollectionsOptions);
		},
	});
}
