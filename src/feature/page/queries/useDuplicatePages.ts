import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicatePages } from "@/feature/page/actions/duplicatePages";
import { allPagesOptions } from "@/feature/page/options/allPagesOptions";

export function useDuplicatePages() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: duplicatePages,
		onSuccess: () => {
			queryClient.invalidateQueries(allPagesOptions);
		},
	});
}
