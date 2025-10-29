import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollectionItems } from "@/feature/dashboard/actions/deleteCollectionItems";
import { allCollectionItemsOptions } from "@/feature/dashboard/options/allCollectionItemsOptions";

export function useDeleteCollectionItems() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCollectionItems,
		onSuccess: () => {
			queryClient.invalidateQueries(allCollectionItemsOptions);
		},
	});
}
