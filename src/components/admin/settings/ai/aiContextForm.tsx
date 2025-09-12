"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
	useSetSetting,
	useSetting,
} from "@/feature/settings/queries/useSettings";
import {
	AiContextSchema,
	aiContextSchema,
} from "@/feature/settings/schemas/aiSettingsSchema";

export default function AiContextForm() {
	const companyActivity = useSetting("companyActivity");
	const companyExperience = useSetting("companyExperience");
	const companyIndustry = useSetting("companyIndustry");
	const companyName = useSetting("companyName");
	const otherInformations = useSetting("otherInformations");
	const toneOfVoice = useSetting("toneOfVoice");
	const aiContextForm = useForm<AiContextSchema>({
		defaultValues: {
			companyActivity: "",
			companyExperience: "",
			companyIndustry: "",
			companyName: "",
			otherInformations: "",
			toneOfVoice: "",
		},
		resolver: zodResolver(aiContextSchema),
	});
	const setSetting = useSetSetting();
	const t = useTranslations("SettingsAi");
	const tCommon = useTranslations("Common");
	const tSettings = useTranslations("Settings");
	const [aiContext, setAiContext] = useState<AiContextSchema | null>(null);

	useEffect(() => {
		if (
			companyActivity.data &&
			companyExperience.data &&
			companyIndustry.data &&
			companyName.data &&
			otherInformations.data &&
			toneOfVoice.data
		) {
			setAiContext({
				companyActivity: companyActivity.data.value ?? "",
				companyExperience: companyExperience.data.value ?? "",
				companyIndustry: companyIndustry.data.value ?? "",
				companyName: companyName.data.value ?? "",
				otherInformations: otherInformations.data.value ?? "",
				toneOfVoice: toneOfVoice.data.value ?? "",
			});

			aiContextForm.reset({
				companyActivity: companyActivity.data.value ?? "",
				companyExperience: companyExperience.data.value ?? "",
				companyIndustry: companyIndustry.data.value ?? "",
				companyName: companyName.data.value ?? "",
				otherInformations: otherInformations.data.value ?? "",
				toneOfVoice: toneOfVoice.data.value ?? "",
			});
		}
	}, [
		companyActivity.data,
		companyExperience.data,
		companyIndustry.data,
		companyName.data,
		otherInformations.data,
		toneOfVoice.data,
		aiContextForm,
	]);

	if (
		companyActivity.isLoading ||
		companyExperience.isLoading ||
		companyIndustry.isLoading ||
		companyName.isLoading ||
		otherInformations.isLoading ||
		toneOfVoice.isLoading
	) {
		return <p className="p-4">{tCommon("Loading")}</p>;
	}

	const onAiContextSubmit = async (data: AiContextSchema) => {
		const keys = Object.keys(data) as (keyof AiContextSchema)[];

		try {
			await keys.forEach(async (key) => {
				const currentValue = aiContext?.[key];
				if (data[key] !== currentValue) {
					await setSetting.mutateAsync(
						{
							key,
							value: String(data[key]),
						},
						{
							onError: (error) => {
								toast.error(error.message);
							},
						},
					);
				}
			});
			toast.success(tSettings("UpdateSettingsSuccess"));
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error";
			toast.error(errorMessage);
		}
	};

	const aiContextWithoutCompanyName = () => {
		const newAiContext = { ...aiContext };
		delete newAiContext.companyName;
		return newAiContext;
	};

	return (
		<Card className="gap-0 py-0">
			<CardHeader className="py-3 px-4 border-b gap-0">
				<CardTitle>{t("AiContextFormTitle")}</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				<p className="text-sm text-muted-foreground mb-4">
					{t("AiContextFormDescription")}
				</p>
				<Form {...aiContextForm}>
					<form
						className="space-y-4"
						onSubmit={aiContextForm.handleSubmit(onAiContextSubmit)}
					>
						<FormField
							control={aiContextForm.control}
							name="companyName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("CompanyNameLabel")}
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="w-full"
											placeholder={t(
												"CompanyNamePlaceholder",
											)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{(
							Object.keys(
								aiContextWithoutCompanyName(),
							) as (keyof Omit<AiContextSchema, "companyName">)[]
						).map((key) => (
							<FormField
								control={aiContextForm.control}
								key={key}
								name={key}
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t(
												`${key[0].toUpperCase()}${key.slice(1)}Label`,
											)}
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												className="w-full"
												placeholder={t(
													`${key[0].toUpperCase()}${key.slice(1)}Placeholder`,
												)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
						<Button disabled={setSetting.isPending} type="submit">
							{setSetting.isPending
								? tCommon("Saving")
								: tCommon("Save")}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
