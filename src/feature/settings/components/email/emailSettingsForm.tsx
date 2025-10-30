"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	useSetSetting,
	useSetting,
} from "@/feature/settings/queries/useSettings";
import {
	EmailSettingsSchema,
	emailSettingsSchema,
} from "@/feature/settings/schemas/emailSettingsSchema";
import { encryptString } from "@/lib/crypto";

export default function EmailSettingsForm() {
	const emailHost = useSetting("emailHost");
	const emailPort = useSetting("emailPort");
	const emailSecure = useSetting("emailSecure");
	const emailSender = useSetting("emailSender");
	const emailUsername = useSetting("emailUsername");
	const setSetting = useSetSetting();
	const emailSettingsForm = useForm<EmailSettingsSchema>({
		defaultValues: {
			emailHost: "",
			emailPassword: "",
			emailPort: 0,
			emailSecure: false,
			emailSender: "",
			emailUsername: "",
		},
		resolver: zodResolver(emailSettingsSchema),
	});
	const [emailSettings, setEmailSettings] =
		useState<EmailSettingsSchema | null>(null);

	useEffect(() => {
		if (
			emailHost.data &&
			emailPort.data &&
			emailSecure.data &&
			emailSender.data &&
			emailUsername.data
		) {
			setEmailSettings({
				emailHost: emailHost.data.value ?? "",
				emailPort: Number(emailPort.data.value ?? ""),
				emailSecure: emailSecure.data.value === "true",
				emailSender: emailSender.data.value ?? "",
				emailUsername: emailUsername.data.value ?? "",
			});
			emailSettingsForm.reset({
				emailHost: emailHost.data.value ?? "",
				emailPort: Number(emailPort.data.value ?? ""),
				emailSecure: emailSecure.data.value === "true",
				emailSender: emailSender.data.value ?? "",
				emailUsername: emailUsername.data.value ?? "",
			});
		}
	}, [
		emailHost.data,
		emailPort.data,
		emailSecure.data,
		emailSender.data,
		emailUsername.data,
		emailSettingsForm,
	]);

	if (
		emailHost.isLoading ||
		emailPort.isLoading ||
		emailSecure.isLoading ||
		emailSender.isLoading ||
		emailUsername.isLoading
	) {
		return <p className="p-4">Loading...</p>;
	}

	const onEmailSettingsSubmit = async (data: EmailSettingsSchema) => {
		const keys = Object.keys(data) as (keyof EmailSettingsSchema)[];

		try {
			await keys.forEach(async (key) => {
				const currentValue = emailSettings?.[key];
				if (data[key] !== "" && data[key] !== currentValue) {
					const result = await setSetting.mutateAsync({
						key,
						value:
							key === "emailPassword"
								? await encryptString(data[key] ?? "")
								: String(data[key]),
					});
					toast.success(result.message);
				}
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error";
			toast.error(errorMessage);
		}
	};

	return (
		<Form {...emailSettingsForm}>
			<form
				className="p-4 w-1/2 space-y-4"
				onSubmit={emailSettingsForm.handleSubmit(onEmailSettingsSubmit)}
			>
				<FormField
					control={emailSettingsForm.control}
					name="emailHost"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Host</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full"
									placeholder="Email Host"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={emailSettingsForm.control}
					name="emailPort"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Port</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full"
									onChange={(value) =>
										field.onChange(
											Number(value.target.value),
										)
									}
									placeholder="Email Port"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={emailSettingsForm.control}
					name="emailSecure"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center gap-2">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={(checked) => {
										field.onChange(checked);
									}}
								/>
							</FormControl>
							<FormLabel>SSL/TLS</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={emailSettingsForm.control}
					name="emailSender"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Sender</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full"
									placeholder="Email Sender"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={emailSettingsForm.control}
					name="emailUsername"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Username</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full"
									placeholder="Email Username"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={emailSettingsForm.control}
					name="emailPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Password</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full"
									placeholder="Email Password"
									type="password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={setSetting.isPending} type="submit">
					{setSetting.isPending ? "Saving..." : "Save"}
				</Button>
			</form>
		</Form>
	);
}
