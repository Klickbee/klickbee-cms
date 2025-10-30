"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
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
import { authClient } from "@/feature/auth/lib/authClient";
import {
	authPasswordResetSchema,
	UserPasswordResetFormValues,
} from "@/feature/auth/schemas/authPasswordResetSchema";

export default function ResetPasswordForm() {
	const router = useRouter();

	const { adminKey } = useParams<{ adminKey: string }>();

	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const t = useTranslations("ResetPassword");

	const resetPasswordForm = useForm<UserPasswordResetFormValues>({
		defaultValues: {
			confirmNewPassword: "",
			newPassword: "",
			token: "",
		},
		resolver: zodResolver(authPasswordResetSchema),
	});

	async function onSubmit(
		userPasswordResetFormValues: UserPasswordResetFormValues,
	) {
		try {
			await authClient.resetPassword({
				newPassword: userPasswordResetFormValues.newPassword,
				token: userPasswordResetFormValues.token,
			});
			resetPasswordForm.reset();
			toast.success(t("SuccessMessage"));
			router.push(`/admin/${adminKey}/auth/login`);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : t("ErrorMessage");
			toast.error(errorMessage);
		}
	}

	useEffect(() => {
		if (token) resetPasswordForm.setValue("token", token);
	}, [resetPasswordForm, token]);

	return (
		<Form {...resetPasswordForm}>
			<form
				className="space-y-4"
				onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
			>
				<FormField
					control={resetPasswordForm.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("NewPasswordLabel")}</FormLabel>
							<FormControl>
								<Input
									placeholder={t("NewPasswordPlaceholder")}
									type="password"
									{...field}
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={resetPasswordForm.control}
					name="confirmNewPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t("NewConfirmPasswordLabel")}
							</FormLabel>
							<FormControl>
								<Input
									placeholder={t(
										"NewConfirmPasswordPlaceholder",
									)}
									type="password"
									{...field}
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className="w-full mt-4"
					disabled={
						!resetPasswordForm.formState.isValid ||
						resetPasswordForm.formState.isSubmitting
					}
					type="submit"
				>
					{resetPasswordForm.formState.isSubmitting
						? t("Resetting")
						: t("ResetButton")}
				</Button>
			</form>
		</Form>
	);
}
