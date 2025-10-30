import { ColumnDef } from "@tanstack/react-table";
import { useLocale, useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { createColumns } from "@/feature/contact/components/contactsTableColumns";
import { useAllContacts } from "@/feature/contact/queries/useAllContacts";
import { useDeleteContact } from "@/feature/contact/queries/useDeleteContact";
import { useContactSearchStore } from "@/feature/contact/stores/storeContactSearch";
import { useContactSelectionStore } from "@/feature/contact/stores/storeContactSelection";
import { useGenericTable } from "@/lib/hooks/useGenericTable";

export function useContactsTable() {
	const { data: contacts } = useAllContacts();
	const deleteContactMutation = useDeleteContact();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const { setSelectedItems } = useContactSelectionStore();
	const { searchQuery } = useContactSearchStore();
	const t = useTranslations("Contacts");
	const tCommon = useTranslations("Common");
	const locale = useLocale();

	const contactData = Array.isArray(contacts) ? contacts : [];

	const handleDeleteContact = useCallback(
		(contactId: number) => {
			deleteContactMutation.mutate(contactId.toString(), {
				onError: () => {
					toast.error(t("DeleteContactError"));
				},
				onSuccess: () => {
					toast.success(t("DeleteContactSuccess"));
				},
			});
		},
		[deleteContactMutation, t],
	);

	const columns = createColumns(
		t,
		tCommon,
		locale,
		handleDeleteContact,
		adminKey ?? "",
	);

	return useGenericTable({
		columns: columns as ColumnDef<(typeof contactData)[number]>[],
		data: contactData,
		searchQuery,
		setSelectedItems,
	});
}
