"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { createColumns } from "@/components/admin/manage/page/pageTableColumns";
import { useDeletePages } from "@/feature/page/queries/useDeletePages";
import { useDuplicatePages } from "@/feature/page/queries/useDuplicatePages";
import { usePages } from "@/feature/page/queries/usePages";
import { usePageSearchStore } from "@/feature/page/stores/storePageSearch";
import { usePageSelectionStore } from "@/feature/page/stores/storePageSelection";
import { useGenericTable } from "@/lib/hooks/useGenericTable";

export function usePagesTable() {
	const t = useTranslations("Pages");
	const tCommon = useTranslations("Common");
	const { searchQuery } = usePageSearchStore();
	const { setSelectedItems, clearSelection } = usePageSelectionStore();

	const deleteMutation = useDeletePages();
	const duplicateMutation = useDuplicatePages();

	const { data: pages } = usePages();

	const pagesData = Array.isArray(pages) ? pages : [];

	const handleDuplicatePage = useCallback(
		(pageId: string) => {
			duplicateMutation.mutate([pageId], {
				onError: () =>
					toast.error(
						t("DuplicateError") || "Error duplicating page",
					),
				onSettled: () => clearSelection(),
				onSuccess: () =>
					toast.success(
						t("DuplicateSuccess", { count: 1 }) ||
							"Page duplicated successfully",
					),
			});
		},
		[duplicateMutation, t],
	);

	const handleDeletePage = useCallback(
		(pageId: string) => {
			deleteMutation.mutate([pageId], {
				onError: () =>
					toast.error(t("DeleteError") || "Error deleting page"),
				onSettled: () => clearSelection(),
				onSuccess: () =>
					toast.success(
						t("DeleteSuccess", { count: 1 }) ||
							"Page deleted successfully",
					),
			});
		},
		[deleteMutation, t],
	);

	const columns = createColumns(
		t,
		tCommon,
		handleDuplicatePage,
		handleDeletePage,
	);

	return useGenericTable({
		columns: columns as ColumnDef<(typeof pagesData)[number]>[],
		data: pagesData,
		searchQuery,
		setSelectedItems,
	});
}
