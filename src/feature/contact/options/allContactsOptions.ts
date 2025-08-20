import { queryOptions } from "@tanstack/react-query";
import { getAllContacts } from "@/feature/contact/lib/contacts";

export const allContactsOptions = queryOptions({
	queryFn: async () => await getAllContacts(),
	queryKey: ["all_contacts"] as const,
});
