import { useSuspenseQuery } from "@tanstack/react-query";
import { allContactsOptions } from "@/feature/contact/options/allContactsOptions";

export function useAllContacts() {
	return useSuspenseQuery(allContactsOptions);
}
