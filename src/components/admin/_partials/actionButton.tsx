"use client";

import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";

interface ActionButtonProps<T = unknown> {
	useSelectionStore: () => {
		selectedItems: string[];
		clearSelection: () => void;
	};
	useDeleteMutation: () => {
		mutate: (
			ids: string[],
			options?: {
				onSuccess?: (result: T) => void;
				onError?: () => void;
			},
		) => void;
	};
	createUrl?: string;
	translationNamespace: string;
}

export default function ActionButton<T = unknown>({
	useSelectionStore,
	useDeleteMutation,
	translationNamespace,
	createUrl,
}: ActionButtonProps<T>) {
	const t = useTranslations(translationNamespace);
	const tCommon = useTranslations("Common");
	const adminKey = useAdminKeyStore((state) => state.adminKey);

	const { selectedItems, clearSelection } = useSelectionStore();
	const deleteMutation = useDeleteMutation();

	const hasSelection = selectedItems.length > 0;

	const handleDeleteSelected = () => {
		deleteMutation.mutate(selectedItems, {
			onError: () => {
				toast.error(t("DeleteError") || "Error deleting items");
			},
			onSuccess: (result) => {
				if (result && Array.isArray(result) && result.length > 0) {
					clearSelection();
					toast.success(
						t("DeleteSuccess", { count: result.length }) ||
							`Successfully deleted ${result.length} items`,
					);
				} else if (result) {
					clearSelection();
					toast.success(
						t("DeleteSuccess", { count: selectedItems.length }) ||
							`Successfully deleted ${selectedItems.length} items`,
					);
				}
			},
		});
	};

	if (hasSelection && deleteMutation) {
		return (
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						className="flex items-center gap-2"
						variant="destructive"
					>
						<Trash className="h-4 w-4" />
						{tCommon("DeleteSelected")} ({selectedItems.length})
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{t("DeleteTitle")}</AlertDialogTitle>
						<AlertDialogDescription>
							{t("DeleteDescription", {
								count: selectedItems.length,
							})}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>
							{tCommon("Cancel")}
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-destructive text-white hover:bg-destructive/90"
							onClick={handleDeleteSelected}
						>
							{tCommon("Delete")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	}

	if (createUrl) {
		return (
			<Button asChild className="flex items-center gap-2">
				<Link href={`/admin/${adminKey}${createUrl}`}>
					<Plus className="h-4 w-4" />
					{t("Add")}
				</Link>
			</Button>
		);
	}

	return null;
}
