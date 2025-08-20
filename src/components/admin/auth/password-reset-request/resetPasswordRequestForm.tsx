"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { authClient } from "@/feature/auth/lib/authClient";
import {
	authPasswordResetRequestSchema,
	UserPasswordResetRequestFormValues,
} from "@/feature/auth/schemas/authPasswordResetRequestSchema";

export default function ResetPasswordRequestForm() {
	const t = useTranslations("ResetPasswordRequest");
	const tCommon = useTranslations("Common");
	const adminKey = useAdminKeyStore((state) => state.adminKey);

	const resetPasswordRequestForm =
		useForm<UserPasswordResetRequestFormValues>({
			defaultValues: {
				email: "",
			},
			resolver: zodResolver(authPasswordResetRequestSchema),
		});

	async function onSubmit(
		userPasswordResetRequestFormValues: UserPasswordResetRequestFormValues,
	) {
		try {
			await authClient.requestPasswordReset({
				email: userPasswordResetRequestFormValues.email,
				redirectTo: `/admin/${adminKey}/auth/password-reset`,
			});
			resetPasswordRequestForm.reset();
			toast.success(t("SuccessMessage"));
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : t("ErrorMessage");
			toast.error(errorMessage);
		}
	}
	return (
		<Form {...resetPasswordRequestForm}>
			<form
				className="space-y-4"
				onSubmit={resetPasswordRequestForm.handleSubmit(onSubmit)}
			>
				<FormField
					control={resetPasswordRequestForm.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{tCommon("Email")}</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full"
									placeholder={tCommon("EmailPlaceholder")}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="w-full mt-4"
					disabled={
						!resetPasswordRequestForm.formState.isValid ||
						resetPasswordRequestForm.formState.isSubmitting
					}
					type="submit"
				>
					{resetPasswordRequestForm.formState.isSubmitting
						? t("Sending")
						: t("SendResetLink")}
				</Button>
			</form>
		</Form>
	);
}
