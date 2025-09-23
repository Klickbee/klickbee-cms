"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
	ContactNotificationFormValues,
	contactNotificationSchema,
} from "@/feature/settings/schemas/contactSettingsSchema";

export default function ContactNotificationForm() {
	const t = useTranslations("SettingsContact");
	const tCommon = useTranslations("Common");

	const setSetting = useSetSetting();

	const emailRecipient = useSetting("contactEmailRecipient");
	const enableSubmissionConfirmation = useSetting(
		"enableSubmissionConfirmation",
	);

	const isLoading =
		emailRecipient.isLoading || enableSubmissionConfirmation.isLoading;

	const defaultValues = useMemo(
		() => ({
			emailRecipient: emailRecipient.data?.value || "",
			enableSubmissionConfirmation:
				enableSubmissionConfirmation.data?.value === "true",
		}),
		[emailRecipient.data?.value, enableSubmissionConfirmation.data?.value],
	);

	const contactNotificationForm = useForm<ContactNotificationFormValues>({
		resolver: zodResolver(contactNotificationSchema),
		values: defaultValues,
	});

	const onSubmit = async (data: ContactNotificationFormValues) => {
		try {
			await Promise.all([
				setSetting.mutateAsync({
					key: "contactEmailRecipient",
					value: data.emailRecipient,
				}),
				setSetting.mutateAsync({
					key: "enableSubmissionConfirmation",
					value: data.enableSubmissionConfirmation.toString(),
				}),
			]);
			toast.success(t("ContactNotificationUpdateSuccess"));
		} catch (_error) {
			toast.error(t("ContactNotificationUpdateError"));
		}
	};

	return (
		<Card className="gap-0 py-0">
			<CardHeader className="p-4 border-b gap-0">
				<CardTitle>{t("ContactNotificationFormTitle")}</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				<Form {...contactNotificationForm}>
					<form
						className="space-y-4"
						onSubmit={contactNotificationForm.handleSubmit(
							onSubmit,
						)}
					>
						<FormField
							control={contactNotificationForm.control}
							name="emailRecipient"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("EmailRecipientLabel")}
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="w-full"
											disabled={isLoading}
											placeholder={
												isLoading
													? tCommon("Loading")
													: t(
															"EmailRecipientPlaceholder",
														) || ""
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={contactNotificationForm.control}
							name="enableSubmissionConfirmation"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											{t(
												"EnableSubmissionConfirmationLabel",
											)}
										</FormLabel>
									</div>
									<FormControl>
										<Checkbox
											checked={field.value}
											disabled={isLoading}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button disabled={setSetting.isPending} type="submit">
							{setSetting.isPending ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									{tCommon("Saving")}
								</>
							) : (
								<>
									<Save className="w-4 h-4 mr-2" />
									{tCommon("Save")}
								</>
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
