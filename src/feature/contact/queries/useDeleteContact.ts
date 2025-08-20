import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContact } from "../lib/contacts";
import { allContactsOptions } from "../options/allContactsOptions";

export function useDeleteContact() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteContact,
		onSuccess: () => {
			queryClient.invalidateQueries(allContactsOptions);
		},
	});
}
