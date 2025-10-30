"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { type FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import UserForm from "@/feature/settings/components/users/userForm";
import { useUpdateUser } from "@/feature/user/queries/useUpdateUser";
import { useUserForEdit } from "@/feature/user/queries/useUserForEdit";
import {
	UpdateUserFormValues,
	updateUserSchema,
} from "@/feature/user/schemas/updateUserSchema";
import { UserToUpdate } from "@/feature/user/types/user";

interface UserUpdateFormProps {
	userId: string;
}

export default function UserUpdateForm({ userId }: UserUpdateFormProps) {
	const { data: user } = useUserForEdit(userId);
	const t = useTranslations("SettingsUsers");
	const router = useRouter();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const updateUserMutation = useUpdateUser();

	const handleSubmit = async (values: FieldValues) => {
		try {
			await updateUserMutation.mutateAsync({
				userId,
				values: values as UpdateUserFormValues,
			});
			toast.success(t("UpdateUserSuccess"));
			router.push(`/admin/${adminKey}/manage/settings/users`);
		} catch (error) {
			console.error("Error updating user:", error);
			toast.error(t("UpdateUserError"));
		}
	};

	if (!user || "error" in user) {
		return <div>Error loading user</div>;
	}

	return (
		<UserForm
			initialValues={user as UserToUpdate}
			isSubmitting={updateUserMutation.isPending}
			onSubmit={handleSubmit}
			schema={updateUserSchema}
			showEmailField={false}
			submitButtonText={t("UpdateUser")}
			submittingText={t("UpdatingUser")}
			title={t("UpdateUser")}
		/>
	);
}
