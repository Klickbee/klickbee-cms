import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePages } from "@/feature/page/lib/pages";
import { allPagesOptions } from "@/feature/page/options/allPagesOptions";

export function useDeletePages() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deletePages,
		onSuccess: () => {
			queryClient.invalidateQueries(allPagesOptions);
		},
	});
}
