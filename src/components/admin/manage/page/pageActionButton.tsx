"use client";

import ActionButton from "@/components/admin/_partials/actionButton";
import { useDeletePages } from "@/feature/page/queries/useDeletePages";
import { useDuplicatePages } from "@/feature/page/queries/useDuplicatePages";
import { usePageSelectionStore } from "@/feature/page/stores/storePageSelection";

export default function PageActionButton() {
	return (
		<ActionButton
			showDeleteButton={true}
			showDuplicateButton={true}
			translationNamespace="Pages"
			useDeleteMutation={useDeletePages}
			useDuplicateMutation={useDuplicatePages}
			useSelectionStore={usePageSelectionStore}
		/>
	);
}
