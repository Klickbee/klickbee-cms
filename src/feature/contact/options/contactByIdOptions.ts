import { queryOptions } from "@tanstack/react-query";
import { getContactById } from "@/feature/contact/lib/contacts";

export const contactByIdOptions = (contactId: string) =>
	queryOptions({
		queryFn: async () => await getContactById(contactId),
		queryKey: ["contact", contactId] as const,
	});
