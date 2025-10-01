"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { toast } from "sonner";
import { createColumns } from "@/components/admin/dashboard/collectionItemTableColumns";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useAllCollectionItems } from "@/feature/dashboard/queries/useAllCollectionItems";
import { useDeleteCollectionItems } from "@/feature/dashboard/queries/useDeleteCollectionItems";
import { useDuplicateCollectionItems } from "@/feature/dashboard/queries/useDuplicateCollectionItems";
import { useCollectionItemSearchStore } from "@/feature/dashboard/stores/storeCollectionItemSearch";
import { useCollectionItemSelectionStore } from "@/feature/dashboard/stores/storeCollectionItemSelection";
import { useCollectionItemSortStore } from "@/feature/dashboard/stores/storeCollectionItemSort";
import { useGenericTable } from "@/lib/hooks/useGenericTable";

export function useCollectionItemTable() {
	const t = useTranslations("Dashboard");
	const tCommon = useTranslations("Common");
	const locale = useLocale();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const { searchQuery } = useCollectionItemSearchStore();
	const { selectedItems, setSelectedItems, clearSelection } =
		useCollectionItemSelectionStore();
	const { sortBy } = useCollectionItemSortStore();

	const deleteMutation = useDeleteCollectionItems();
	const duplicateMutation = useDuplicateCollectionItems();

	const { data: collectionItems } = useAllCollectionItems();

	const collectionItemData = useMemo(() => {
		const rawData = Array.isArray(collectionItems) ? collectionItems : [];

		// Filtrer par statut si nécessaire
		const filteredData =
			sortBy === "all"
				? rawData
				: rawData.filter((item) => item.status === sortBy);

		return filteredData;
	}, [collectionItems, sortBy]);

	const handleDuplicate = (id: string) => {
		duplicateMutation.mutate([id], {
			onError: () => {
				toast.error(t("DuplicateError") || "Error duplicating item");
			},
			onSettled: () => {
				// Petit délai pour s'assurer que les données sont complètement rafraîchies
				setTimeout(() => {
					clearSelection();
				}, 100);
			},
			onSuccess: (result) => {
				toast.success(
					t("DuplicateSuccess", { count: result.length }) ||
						`Successfully duplicated ${result.length} items`,
				);
			},
		});
	};

	const handleDelete = (id: string) => {
		deleteMutation.mutate([id], {
			onError: () => {
				toast.error(t("DeleteError") || "Error deleting item");
			},
			onSettled: () => {
				// Petit délai pour s'assurer que les données sont complètement rafraîchies
				setTimeout(() => {
					clearSelection();
				}, 100);
			},
			onSuccess: () => {
				toast.success(
					t("DeleteSuccess", { count: 1 }) ||
						`Successfully deleted 1 item`,
				);
			},
		});
	};

	const columns = createColumns(
		t,
		tCommon,
		locale,
		adminKey ?? "",
		handleDuplicate,
		handleDelete,
	);

	return useGenericTable({
		columns: columns as ColumnDef<(typeof collectionItemData)[number]>[],
		data: collectionItemData,
		searchQuery,
		selectedItems,
		setSelectedItems,
	});
}
