import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { FieldArrayWithId, UseFormRegister, useForm } from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/(dashboard)/manage/settings/builder/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	SectionGap,
	SectionPadding,
} from "@/feature/builder/types/settings/SpacingSettings";

type SpacingEditorProps = {
	paddingFields: FieldArrayWithId<
		FormValues,
		"spacing.sectionPadding",
		"id"
	>[];
	gapFields: FieldArrayWithId<FormValues, "spacing.gap", "id">[];
	register: UseFormRegister<FormValues>;
	removePadding: (_index: number) => void;
	appendPadding: (_value: SectionPadding) => void;
	removeGap: (_index: number) => void;
	appendGap: (_value: SectionGap) => void;
	watch: ReturnType<typeof useForm<FormValues>>["watch"];
	setValue: ReturnType<typeof useForm<FormValues>>["setValue"];
};

const SpacingEditor = React.memo(function SpacingEditor({
	paddingFields,
	gapFields,
	register,
	removePadding,
	appendPadding,
	removeGap,
	appendGap,
	watch,
	setValue,
}: SpacingEditorProps) {
	const t = useTranslations("SpacingEditor");
	// // Ajout d’un padding
	// const handleAddPadding = useCallback(() => {
	// 	appendPadding({
	// 		key: "",
	// 		top: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 		right: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 		bottom: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 		left: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 	});
	// }, [appendPadding]);
	//
	// // Ajout d’un gap
	// const handleAddGap = useCallback(() => {
	// 	appendGap({
	// 		key: "",
	// 		row: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 		column: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 	});
	// }, [appendGap]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("Title")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Section Padding */}
				<div>
					<h3 className="font-semibold mb-2">{t("Padding")}</h3>

					<Label>{t("MaxWidth")}</Label>
					<Input
						aria-label={t("MaxWidth")}
						className="w-24 h-7 text-xs mb-2"
						onChange={(e) =>
							setValue(`spacing.maxWidth`, Number(e.target.value))
						}
						placeholder={t("MaxWidth")}
						value={watch(`spacing.maxWidth`)}
					/>
					{paddingFields.map((pad: SectionPadding, idx) => (
						<div className="mb-4" key={idx}>
							<Label>{t("Key")}</Label>
							<Input
								{...register(
									`spacing.sectionPadding.${idx}.key`,
								)}
								aria-label={t("PaddingName")}
								className="w-24 h-7 text-xs mb-2"
								placeholder={t("PaddingName")}
							/>

							<Label>{t("Padding")}</Label>
							<div className="flex gap-1 items-end">
								{(
									["top", "right", "bottom", "left"] as const
								).map((side) => (
									<div
										className="flex flex-col items-center"
										key={side}
									>
										<Input
											{...register(
												`spacing.sectionPadding.${idx}.${side}.min`,
											)}
											aria-label={`${t("Padding")} ${side}`}
											className="w-16"
											placeholder={
												side.charAt(0).toUpperCase() +
												side.slice(1)
											}
										/>
										<span className="text-xs text-muted-foreground">
											px
										</span>
									</div>
								))}
							</div>
							{paddingFields.length > 1 && (
								<Button
									aria-label={t("DeletePadding")}
									onClick={() => removePadding(idx)}
									size="icon"
									type="button"
									variant="ghost"
								>
									✕
								</Button>
							)}
						</div>
					))}
					<Button
						aria-label={t("AddPadding")}
						className="mt-2"
						onClick={() =>
							appendPadding({
								bottom: {
									max: 2,
									maxWidth: 1440,
									min: 1,
									sizeUnit: "rem",
								},
								key: "",
								left: {
									max: 2,
									maxWidth: 1440,
									min: 1,
									sizeUnit: "rem",
								},
								right: {
									max: 2,
									maxWidth: 1440,
									min: 1,
									sizeUnit: "rem",
								},
								top: {
									max: 2,
									maxWidth: 1440,
									min: 1,
									sizeUnit: "rem",
								},
							})
						}
						size="sm"
						type="button"
						variant="outline"
					>
						<Plus className="w-4 h-4 mr-1" /> {t("AddPadding")}
					</Button>
				</div>

				{/* Section Gap */}
				<div>
					<h3 className="font-semibold mb-2">{t("Gap")}</h3>
					{gapFields.map((gap, idx) => (
						<div className="mb-4" key={gap.id}>
							<Label>{t("Key")}</Label>
							<Input
								{...register(`spacing.gap.${idx}.key`)}
								aria-label={t("GapName")}
								className="w-24 h-7 text-xs mb-2"
								placeholder={t("GapName")}
							/>
							<Label>{t("Gap")}</Label>
							<div className="flex gap-1 items-end">
								{(["row", "column"] as const).map((type) => (
									<div
										className="flex flex-col items-center"
										key={type}
									>
										<Input
											{...register(
												`spacing.gap.${idx}.${type}.min`,
											)}
											aria-label={`${t("Gap")} ${type}`}
											className="w-16"
											placeholder={
												type.charAt(0).toUpperCase() +
												type.slice(1)
											}
										/>
										<span className="text-xs text-muted-foreground">
											{gap?.[type]?.widthUnit}
										</span>
									</div>
								))}
							</div>
							{gapFields.length > 1 && (
								<Button
									aria-label={t("DeleteGap")}
									onClick={() => removeGap(idx)}
									size="icon"
									type="button"
									variant="ghost"
								>
									✕
								</Button>
							)}
						</div>
					))}
					<Button
						aria-label={t("AddGap")}
						className="mt-2"
						onClick={() =>
							appendGap({
								column: {
									max: 2,
									maxWidth: 1440,
									min: 1,
									sizeUnit: "rem",
								},
								key: "",
								row: {
									max: 2,
									maxWidth: 1440,
									min: 1,
									sizeUnit: "rem",
								},
							})
						}
						size="sm"
						type="button"
						variant="outline"
					>
						<Plus className="w-4 h-4 mr-1" /> {t("AddGap")}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
});

export default SpacingEditor;
