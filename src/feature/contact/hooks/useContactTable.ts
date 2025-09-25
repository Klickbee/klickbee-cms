import { ColumnDef } from "@tanstack/react-table";
import { useLocale, useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { createColumns } from "@/components/admin/manage/contact/contactTableColumns";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useAllContacts } from "@/feature/contact/queries/useAllContacts";
import { useDeleteContacts } from "@/feature/contact/queries/useDeleteContacts";
import { useContactSearchStore } from "@/feature/contact/stores/storeContactSearch";
import { useContactSelectionStore } from "@/feature/contact/stores/storeContactSelection";
import { useGenericTable } from "@/lib/hooks/useGenericTable";

export function useContactsTable() {
	const { data: contacts } = useAllContacts();
	const deleteContactMutation = useDeleteContacts();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const { setSelectedItems, clearSelection } = useContactSelectionStore();
	const { searchQuery } = useContactSearchStore();
	const t = useTranslations("Contacts");
	const tCommon = useTranslations("Common");
	const locale = useLocale();

	const contactData = Array.isArray(contacts) ? contacts : [];

	const handleDeleteContact = useCallback(
		(contactId: number) => {
			deleteContactMutation.mutate([contactId.toString()], {
				onError: () => toast.error(t("DeleteContactError")),
				onSettled: () => clearSelection(),
				onSuccess: () => toast.success(t("DeleteContactSuccess")),
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
