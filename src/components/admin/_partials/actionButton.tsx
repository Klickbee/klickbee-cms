"use client";

import { UseMutationResult } from "@tanstack/react-query";
import { Copy, Plus, Trash } from "lucide-react";
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

interface ActionButtonProps {
	useSelectionStore: () => {
		selectedItems: string[];
		clearSelection: () => void;
	};
	useDeleteMutation?: () => UseMutationResult<
		unknown,
		Error,
		string[],
		unknown
	>;
	useDuplicateMutation?: () => UseMutationResult<
		unknown[],
		Error,
		string[],
		unknown
	>;
	createUrl?: string;
	translationNamespace: string;
	showDeleteButton?: boolean;
	showDuplicateButton?: boolean;
	children?: React.ReactNode;
}

export default function ActionButton({
	useSelectionStore,
	useDeleteMutation,
	useDuplicateMutation,
	translationNamespace,
	createUrl,
	showDeleteButton = true,
	showDuplicateButton = false,
	children,
}: ActionButtonProps) {
	const t = useTranslations(translationNamespace);
	const tCommon = useTranslations("Common");
	const adminKey = useAdminKeyStore((state) => state.adminKey);

	const { selectedItems, clearSelection } = useSelectionStore();
	const deleteMutation = useDeleteMutation?.();
	const duplicateMutation = useDuplicateMutation?.();

	const hasSelection = selectedItems.length > 0;

	const handleDeleteSelected = () => {
		if (!deleteMutation) return;
		deleteMutation.mutate(selectedItems, {
			onError: () => {
				toast.error(t("DeleteError") || "Error deleting items");
			},
			onSettled: () => {
				// Petit délai pour s'assurer que les données sont complètement rafraîchies
				setTimeout(() => {
					clearSelection();
				}, 100);
			},
			onSuccess: () => {
				toast.success(
					t("DeleteSuccess", { count: selectedItems.length }) ||
						`Successfully deleted ${selectedItems.length} items`,
				);
			},
		});
	};

	const handleDuplicate = () => {
		if (!duplicateMutation) return;
		duplicateMutation.mutate(selectedItems, {
			onError: () => {
				toast.error(t("DuplicateError") || "Error duplicating items");
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

	if (hasSelection && (showDeleteButton || showDuplicateButton)) {
		return (
			<div className="flex items-center gap-3">
				{showDeleteButton && deleteMutation && (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								className="flex items-center gap-2 border-red-300 text-red-600 hover:bg-red-50 h-9"
								variant="outline"
							>
								<Trash className="h-4 w-4" />
								Delete ({selectedItems.length})
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									{t("DeleteTitle")}
								</AlertDialogTitle>
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
				)}

				{showDuplicateButton && duplicateMutation && (
					<Button
						className="flex items-center gap-2 h-9"
						disabled={duplicateMutation.isPending}
						onClick={handleDuplicate}
						variant="outline"
					>
						<Copy className="h-4 w-4" />
						Duplicate ({selectedItems.length})
					</Button>
				)}

				{children}
			</div>
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
