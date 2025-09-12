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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	useSetSetting,
	useSetting,
} from "@/feature/settings/queries/useSettings";
import {
	AiSettingsSchema,
	aiSettingsSchema,
} from "@/feature/settings/schemas/aiSettingsSchema";

export default function AiSettingsForm() {
	const aiApiKey = useSetting("aiApiKey");
	const aiModel = useSetting("aiModel");
	const aiSettingsForm = useForm<AiSettingsSchema>({
		defaultValues: {
			aiApiKey: "",
			aiModel: "chatgpt",
		},
		resolver: zodResolver(aiSettingsSchema),
	});
	const setSetting = useSetSetting();
	const t = useTranslations("SettingsAi");
	const tCommon = useTranslations("Common");
	const tSettings = useTranslations("Settings");
	const [aiSettings, setAiSettings] = useState<AiSettingsSchema | null>(null);

	useEffect(() => {
		if (aiApiKey.data && aiModel.data) {
			const allowedModels = ["chatgpt", "mistral", "deepseek"] as const;
			const modelValue = aiModel.data
				.value as (typeof allowedModels)[number];

			setAiSettings({
				aiApiKey: aiApiKey.data.value ?? "",
				aiModel: modelValue,
			});

			// Reset the entire form first, then explicitly set the select value to force RHF to propagate it
			aiSettingsForm.reset({
				aiApiKey: aiApiKey.data.value ?? "",
				aiModel: modelValue,
			});
			aiSettingsForm.setValue("aiModel", modelValue, {
				shouldDirty: false,
				shouldTouch: false,
				shouldValidate: false,
			});
		}
	}, [aiApiKey.data, aiModel.data, aiSettingsForm]);

	if (aiApiKey.isLoading || aiModel.isLoading) {
		return <p className="p-4">{tCommon("Loading")}</p>;
	}

	const onAiSettingsSubmit = async (data: AiSettingsSchema) => {
		const keys = Object.keys(data) as (keyof AiSettingsSchema)[];

		try {
			await keys.forEach(async (key) => {
				const currentValue = aiSettings?.[key];
				if (data[key] !== "" && data[key] !== currentValue) {
					await setSetting.mutateAsync({
						key,
						value: String(data[key]),
					});
				}
			});
			toast.success(tSettings("UpdateSettingsSuccess"));
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error";
			toast.error(errorMessage);
		}
	};

	return (
		<Card className="gap-0 py-0">
			<CardHeader className="py-3 px-4 border-b gap-0">
				<CardTitle>{t("AiSettingsFormTitle")}</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				<Form {...aiSettingsForm}>
					<form
						className="space-y-4"
						onSubmit={aiSettingsForm.handleSubmit(
							onAiSettingsSubmit,
						)}
					>
						<FormField
							control={aiSettingsForm.control}
							name="aiModel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("AiModelLabel")}</FormLabel>
									<Select
										key={String(field.value ?? "")}
										onValueChange={field.onChange}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue
													placeholder={t(
														"AiModelLabel",
													)}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="chatgpt">
												ChatGPT
											</SelectItem>
											<SelectItem value="mistral">
												Mistral
											</SelectItem>
											<SelectItem value="deepseek">
												Deepseek
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={aiSettingsForm.control}
							name="aiApiKey"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("ApiKeyLabel")}</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="w-full"
											placeholder={t("ApiKeyLabel")}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
