"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
	ContactInformationFormValues,
	contactInformationsSchema,
} from "@/feature/settings/schemas/contactSettingsSchema";

export default function ContactInformationForm() {
	const t = useTranslations("SettingsContact");
	const tCommon = useTranslations("Common");

	const setSetting = useSetSetting();

	const contactEmail = useSetting("contactEmail");
	const contactPhone = useSetting("contactPhone");

	const isLoading = contactEmail.isLoading || contactPhone.isLoading;

	const defaultValues = useMemo(
		() => ({
			contactEmail: contactEmail.data?.value || "",
			contactPhone: contactPhone.data?.value || "",
		}),
		[contactEmail.data?.value, contactPhone.data?.value],
	);

	const conctactInformationForm = useForm<ContactInformationFormValues>({
		resolver: zodResolver(contactInformationsSchema),
		values: defaultValues,
	});

	const onSubmit = async (data: ContactInformationFormValues) => {
		try {
			await Promise.all([
				setSetting.mutateAsync({
					key: "contactEmail",
					value: data.contactEmail,
				}),
				setSetting.mutateAsync({
					key: "contactPhone",
					value: data.contactPhone || "",
				}),
			]);
			toast.success(t("ContactInformationUpdateSuccess"));
		} catch (_error) {
			toast.error(t("ContactInformationUpdateError"));
		}
	};

	return (
		<Card className="gap-0 py-0">
			<CardHeader className="p-4 border-b gap-0">
				<CardTitle>{t("ContactInformationFormTitle")}</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				<Form {...conctactInformationForm}>
					<form
						className="space-y-4"
						onSubmit={conctactInformationForm.handleSubmit(
							onSubmit,
						)}
					>
						<FormField
							control={conctactInformationForm.control}
							name="contactEmail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("ContactEmailLabel")}
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
															"ContactEmailPlaceholder",
														) || ""
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={conctactInformationForm.control}
							name="contactPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("ContactPhoneLabel")}
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
															"ContactPhonePlaceholder",
														) || ""
											}
										/>
									</FormControl>
									<FormMessage />
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
