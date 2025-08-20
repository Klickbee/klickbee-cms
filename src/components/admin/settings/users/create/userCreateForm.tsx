"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { type FieldValues } from "react-hook-form";
import { toast } from "sonner";
import UserForm from "@/components/admin/settings/users/userForm";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useCreateUser } from "@/feature/user/queries/useCreateUser";
import {
	CreateUserFormValues,
	createUserSchema,
} from "@/feature/user/schemas/createUserSchema";

export default function UserCreateForm() {
	const t = useTranslations("SettingsUsers");
	const router = useRouter();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const createUserMutation = useCreateUser();

	const handleSubmit = async (values: FieldValues) => {
		try {
			await createUserMutation.mutateAsync(
				values as CreateUserFormValues,
				{
					onError: (error) => {
						console.error("Error creating user:", error);
						toast.error(t("CreateUserError"));
					},
					onSuccess: () => {
						toast.success(t("CreateUserSuccess"));
						router.push(`/admin/${adminKey}/manage/settings/users`);
					},
				},
			);
		} catch (error) {
			console.error("Error creating user:", error);
			toast.error(t("CreateUserError"));
		}
	};

	return (
		<UserForm
			initialValues={{ email: "", name: "" }}
			isSubmitting={createUserMutation.isPending}
			onSubmit={handleSubmit}
			schema={createUserSchema}
			showEmailField={true}
			submitButtonText={t("SendInvite")}
			submittingText={t("SendingInvitation")}
			title={t("SendInvite")}
		/>
	);
}
