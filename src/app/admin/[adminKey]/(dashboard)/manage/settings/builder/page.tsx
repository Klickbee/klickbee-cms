"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import ColorPaletteEditor from "@/builder/components/settings/ColorEditor";
import ColorPreview from "@/builder/components/settings/ColorPreview";
import LogoEditor from "@/builder/components/settings/LogoEditor";
import SpacingEditor from "@/builder/components/settings/SpacingEditor";
import SpacingPreview from "@/builder/components/settings/SpacingPreview";
import TypographyEditor from "@/builder/components/settings/TypographyEditor";
import TypographyPreview from "@/builder/components/settings/TypographyPreview";
import {
	defaultGlobalSettings,
	globalSettingsSchema,
} from "@/builder/types/settings/GlobalSettingsData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export type FormValues = z.output<typeof globalSettingsSchema>;

// Create custom defaultValues that match component expectations
const defaultValues: FormValues = {
	colors: defaultGlobalSettings.colors,
	logos: defaultGlobalSettings.logos,
	spacing: defaultGlobalSettings.spacing,
	typography: defaultGlobalSettings.typography,
};

export default function AdminBuilderSettingsPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const t = useTranslations("BuilderSettings");

	const {
		register,
		handleSubmit,
		watch,
		control,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues,
		mode: "onChange",
		resolver: zodResolver(globalSettingsSchema),
	});

	// Gestion des erreurs
	const hasErrors = Object.keys(errors).length > 0;
	if (hasErrors) {
		console.error("Form errors:", errors);
	}

	const onSubmit = async (data: FormValues) => {
		try {
			setIsSubmitting(true);

			// Transform data to match API expectations
			const transformedData = {
				...data,
				spacing: data.spacing, // Take the first spacing object
				typography: {
					maxWidth: defaultGlobalSettings.typography.maxWidth,
					typographies: data.typography,
				},
			};

			const response = await fetch("/api/admin/builder/settings", {
				body: JSON.stringify(transformedData),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});

			if (!response.ok) {
				throw new Error("Failed to save settings");
			}

			toast(t("Success"), {
				description: t("SuccessMessage"),
			});
		} catch (error) {
			console.error("Error saving settings:", error);
			toast(t("Error"), {
				description: t("ErrorMessage"),
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Couleurs dynamiques
	const {
		fields: colorFields,
		append: appendColor,
		remove: removeColor,
	} = useFieldArray({
		control,
		name: "colors",
	});

	const {
		fields: paddingFields,
		append: appendPadding,
		remove: removePadding,
	} = useFieldArray({
		control,
		name: "spacing.sectionPadding",
	});

	const {
		fields: gapFields,
		append: appendGap,
		remove: removeGap,
	} = useFieldArray({
		control,
		name: "spacing.gap",
	});

	const watched = watch();
	const typography = watched.typography;
	const spacing = watched.spacing;
	const colors = watched.colors;

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-6">{t("GlobalSettings")}</h1>
			<p className="text-gray-500 mb-8">
				{t("GlobalSettingsDescription")}
			</p>

			{hasErrors && (
				<Alert className="mb-6" variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>{t("Error")}</AlertTitle>
					<AlertDescription>{t("FormErrors")}</AlertDescription>
				</Alert>
			)}

			<form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">
						{t("Typography")}
					</h2>
					<p className="text-gray-500 mb-4">
						{t("TypographyDescription")}
					</p>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
						<TypographyEditor
							control={control}
							register={register}
							setValue={setValue}
							watch={watch}
						/>
						<TypographyPreview typography={typography} />
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">
						{t("Colors")}
					</h2>
					<p className="text-gray-500 mb-4">
						{t("ColorsDescription")}
					</p>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
						<ColorPaletteEditor
							appendColor={appendColor}
							colorFields={colorFields}
							register={register}
							removeColor={removeColor}
							setValue={setValue}
						/>
						<ColorPreview colors={colors} />
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">
						{t("Spacing")}
					</h2>
					<p className="text-gray-500 mb-4">
						{t("SpacingDescription")}
					</p>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
						<SpacingEditor
							appendGap={appendGap}
							appendPadding={appendPadding}
							gapFields={gapFields}
							paddingFields={paddingFields}
							register={register}
							removeGap={removeGap}
							removePadding={removePadding}
							setValue={setValue}
							watch={watch}
						/>
						<SpacingPreview spacing={spacing} />
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">{t("Logos")}</h2>
					<p className="text-gray-500 mb-4">
						{t("LogosDescription")}
					</p>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
						<LogoEditor
							logos={watched.logos}
							onChange={(logos) => setValue("logos", logos)}
						/>
					</div>
				</section>

				<div className="flex justify-end">
					<Button
						className="px-6"
						disabled={isSubmitting}
						type="submit"
					>
						{isSubmitting ? t("Saving") : t("SaveSettings")}
					</Button>
				</div>
			</form>
		</div>
	);
}
