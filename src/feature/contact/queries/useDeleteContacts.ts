import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContacts } from "../lib/contacts";
import { allContactsOptions } from "../options/allContactsOptions";

export function useDeleteContacts() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteContacts,
		onSuccess: () => {
			queryClient.invalidateQueries(allContactsOptions);
		},
	});
}
