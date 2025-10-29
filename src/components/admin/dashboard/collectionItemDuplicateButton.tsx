"use client";

import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDuplicateCollectionItems } from "@/feature/dashboard/queries/useDuplicateCollectionItems";
import { useCollectionItemSelectionStore } from "@/feature/dashboard/stores/storeCollectionItemSelection";

export default function CollectionItemDuplicateButton() {
	const t = useTranslations("Dashboard");
	const tCommon = useTranslations("Common");

	const { selectedItems, clearSelection } = useCollectionItemSelectionStore();
	const duplicateMutation = useDuplicateCollectionItems();

	const handleDuplicate = () => {
		duplicateMutation.mutate(selectedItems, {
			onError: () => {
				toast.error(t("DuplicateError") || "Error duplicating items");
			},
			onSuccess: (result) => {
				if (result) {
					clearSelection();
					toast.success(
						t("DuplicateSuccess", {
							count: selectedItems.length,
						}) ||
							`Successfully duplicated ${selectedItems.length} items`,
					);
				}
			},
		});
	};

	return (
		<Button
			className="flex items-center gap-2"
			disabled={duplicateMutation.isPending}
			onClick={handleDuplicate}
			variant="outline"
		>
			<Copy className="h-4 w-4" />
			{tCommon("Duplicate")} ({selectedItems.length})
		</Button>
	);
}
