"use client";

import ActionButton from "@/components/admin/_partials/actionButton";
import { useDeleteCollectionItems } from "@/feature/dashboard/queries/useDeleteCollectionItems";
import { useDuplicateCollectionItems } from "@/feature/dashboard/queries/useDuplicateCollectionItems";
import { useCollectionItemSelectionStore } from "@/feature/dashboard/stores/storeCollectionItemSelection";

export default function CollectionItemActionButton() {
	return (
		<ActionButton
			showDeleteButton={true}
			showDuplicateButton={true}
			translationNamespace="Dashboard"
			useDeleteMutation={useDeleteCollectionItems}
			useDuplicateMutation={useDuplicateCollectionItems}
			useSelectionStore={useCollectionItemSelectionStore}
		/>
	);
}
