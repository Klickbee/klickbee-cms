"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
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
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { authClient } from "@/feature/auth/lib/authClient";
import {
	authLoginSchema,
	UserLoginFormValues,
} from "@/feature/auth/schemas/authLoginSchema";

export default function LoginForm() {
	const { adminKey } = useParams<{ adminKey: string }>();
	const { setAdminKey } = useAdminKeyStore();

	useEffect(() => {
		setAdminKey(adminKey);
	}, [adminKey, setAdminKey]);

	const t = useTranslations("Login");
	const tCommon = useTranslations("Common");

	const loginForm = useForm<UserLoginFormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(authLoginSchema),
	});

	async function onSubmit(loginFormValues: UserLoginFormValues) {
		const { email, password } = loginFormValues;

		const { data, error } = await authClient.signIn.email({
			email,
			password,
		});

		if (error) {
			toast.error(t("ConnectionError"));
			return;
		}

		if (data) {
			window.location.href = `/admin/${adminKey}`;
		} else {
			toast.error(t("ConnectionFailed"));
		}
	}

	return (
		<Form {...loginForm}>
			<form
				className="space-y-4"
				onSubmit={loginForm.handleSubmit(onSubmit)}
			>
				<FormField
					control={loginForm.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{tCommon("Email")}</FormLabel>
							<FormControl>
								<Input
									placeholder={tCommon("EmailPlaceholder")}
									type="email"
									{...field}
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={loginForm.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{tCommon("Password")}</FormLabel>
							<FormControl>
								<Input
									placeholder={tCommon("PasswordPlaceholder")}
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
					className="w-full"
					disabled={
						!loginForm.formState.isValid ||
						loginForm.formState.isSubmitting
					}
					type="submit"
				>
					{loginForm.formState.isSubmitting
						? t("LoggingIn")
						: t("LoginButton")}
				</Button>
			</form>
		</Form>
	);
}
