"use client";

import ActionButton from "@/components/admin/_partials/actionButton";
import { useDeleteContacts } from "@/feature/contact/queries/useDeleteContacts";
import { useContactSelectionStore } from "@/feature/contact/stores/storeContactSelection";

export default function ContactActionButton() {
	return (
		<ActionButton
			translationNamespace="Contacts"
			useDeleteMutation={useDeleteContacts}
			useSelectionStore={useContactSelectionStore}
		/>
	);
}
