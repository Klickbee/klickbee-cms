import { useSuspenseQuery } from "@tanstack/react-query";
import { contactByIdOptions } from "@/feature/contact/options/contactByIdOptions";

export function useContactById(contactId: string) {
	return useSuspenseQuery(contactByIdOptions(contactId));
}
