"use client";

import ActionButton from "@/components/admin/_partials/actionButton";
import { useDeleteUsers } from "@/feature/user/queries/useDeleteUsers";
import { useUserSelectionStore } from "@/feature/user/stores/storeUserSelection";

export default function UserActionButton() {
	return (
		<ActionButton
			createUrl="/manage/settings/users/create"
			translationNamespace="SettingsUsers"
			useDeleteMutation={useDeleteUsers}
			useSelectionStore={useUserSelectionStore}
		/>
	);
}
