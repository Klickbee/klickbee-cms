"use client";

import ActionButton from "@/components/admin/_partials/actionButton";
import { useCollectionItemSelectionStore } from "@/feature/collection/stores/storeCollectionItemSelection";
import { useDeleteCollectionItems } from "@/feature/dashboard/queries/useDeleteCollectionItems";

export default function CollectionItemActionButton() {
	return (
		<ActionButton
			translationNamespace="CollectionItems"
			useDeleteMutation={useDeleteCollectionItems}
			useSelectionStore={useCollectionItemSelectionStore}
		/>
	);
}
