import { ColumnDef } from "@tanstack/react-table";
import { useLocale, useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { createCollectionItemColumns } from "@/components/admin/manage/collectionItems/collectionItemTableColumns";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useCollectionItemSearchStore } from "@/feature/collection/stores/storeCollectionItemSearch";
import { useCollectionItemSelectionStore } from "@/feature/collection/stores/storeCollectionItemSelection";
import { useCollectionItemsBySlug } from "@/feature/collectionItem/queries/useCollectionItemsBySlug";
import { useDeleteCollectionItems } from "@/feature/dashboard/queries/useDeleteCollectionItems";
import { useGenericTable } from "@/lib/hooks/useGenericTable";

export function useCollectionItemsTable(collectionSlug: string) {
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const locale = useLocale();

	const { data } = useCollectionItemsBySlug(collectionSlug);
	const deleteCollectionItemsMutation = useDeleteCollectionItems();

	const { setSelectedItems, clearSelection } =
		useCollectionItemSelectionStore();
	const { searchQuery } = useCollectionItemSearchStore();

	const t = useTranslations("CollectionItems");
	const tCommon = useTranslations("Common");

	const collectionItemsData = Array.isArray(data.collectionItems)
		? data.collectionItems
		: [];

	const handleDeleteCollectionItem = useCallback(
		(itemId: number) => {
			deleteCollectionItemsMutation.mutate([itemId.toString()], {
				onError: () => toast.error(t("DeleteCollectionItemError")),
				onSettled: () => clearSelection(),
				onSuccess: () =>
					toast.success(t("DeleteCollectionItemSuccess")),
			});
		},
		[collectionSlug, t, clearSelection],
	);

	const columns = createCollectionItemColumns(
		t,
		tCommon,
		locale,
		adminKey ?? "",
		collectionSlug,
		handleDeleteCollectionItem,
	);

	return useGenericTable({
		columns: columns as ColumnDef<(typeof collectionItemsData)[number]>[],
		data: collectionItemsData,
		searchQuery,
		setSelectedItems,
	});
}
