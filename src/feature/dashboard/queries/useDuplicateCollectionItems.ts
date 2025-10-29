import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCollectionItems } from "@/feature/dashboard/actions/duplicateCollectionItems";
import { allCollectionItemsOptions } from "@/feature/dashboard/options/allCollectionItemsOptions";

export function useDuplicateCollectionItems() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: duplicateCollectionItems,
		onSuccess: () => {
			queryClient.invalidateQueries(allCollectionItemsOptions);
		},
	});
}
