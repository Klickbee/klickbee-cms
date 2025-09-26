import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { createColumns } from "@/components/admin/manage/collection/collectionTableColumns";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useAllCollections } from "@/feature/collection/queries/useAllCollections";
import { useDeleteCollections } from "@/feature/collection/queries/useDeleteCollections";
import { useCollectionSearchStore } from "@/feature/collection/stores/storeCollectionSearch";
import { useCollectionSelectionStore } from "@/feature/collection/stores/storeCollectionSelection";
import { useGenericTable } from "@/lib/hooks/useGenericTable";

export function useCollectionsTable() {
	const { data: collections } = useAllCollections();
	const deleteCollectionMutation = useDeleteCollections();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const { setSelectedItems, clearSelection } = useCollectionSelectionStore();
	const { searchQuery } = useCollectionSearchStore();
	const t = useTranslations("Contents");
	const tCommon = useTranslations("Common");

	const collectionData = Array.isArray(collections) ? collections : [];

	const handleDeleteCollection = useCallback(
		(collectionId: number) => {
			deleteCollectionMutation.mutate([collectionId.toString()], {
				onError: () => toast.error(t("DeleteCollectionError")),
				onSettled: () => clearSelection(),
				onSuccess: () => toast.success(t("DeleteCollectionSuccess")),
			});
		},
		[deleteCollectionMutation, t, clearSelection],
	);

	const columns = createColumns(
		t,
		tCommon,
		handleDeleteCollection,
		adminKey ?? "",
	);

	return useGenericTable({
		columns: columns as ColumnDef<(typeof collectionData)[number]>[],
		data: collectionData,
		searchQuery,
		setSelectedItems,
	});
}
