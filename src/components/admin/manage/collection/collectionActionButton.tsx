"use client";

import ActionButton from "@/components/admin/_partials/actionButton";
import { useDeleteCollections } from "@/feature/collection/queries/useDeleteCollections";
import { useCollectionSelectionStore } from "@/feature/collection/stores/storeCollectionSelection";

export default function CollectionActionButton() {
	return (
		<ActionButton
			translationNamespace="Contents"
			useDeleteMutation={useDeleteCollections}
			useSelectionStore={useCollectionSelectionStore}
		/>
	);
}
