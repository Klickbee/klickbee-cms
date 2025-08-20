import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import type {
	FieldArrayWithId,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/(dashboard)/manage/settings/builder/page";
import { ColorType, colorTypes } from "@/builder/types/settings/ColorSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type ColorPaletteEditorProps = {
	colorFields: FieldArrayWithId<FormValues, "colors", "id">[];
	register: UseFormRegister<FormValues>;
	setValue: UseFormSetValue<FormValues>;
	removeColor: (_index: number) => void;
	appendColor: (_value: {
		hexCode: string;
		name: string;
		type: ColorType;
	}) => void;
};

const ColorPaletteEditor = React.memo(function ColorPaletteEditor({
	colorFields,
	register,
	setValue,
	removeColor,
	appendColor,
}: ColorPaletteEditorProps) {
	const t = useTranslations("ColorEditor");
	const handleAdd = useCallback(
		() => appendColor({ hexCode: "#000000", name: "", type: "primary" }),
		[appendColor],
	);
	const handleRemove = useCallback(
		(idx: number) => removeColor(idx),
		[removeColor],
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("Title")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{colorFields.map((color, idx) => (
					<div className="flex flex-col gap-2" key={color.id}>
						<div className="flex items-center gap-2">
							<Input
								type="color"
								{...register(`colors.${idx}.hexCode`)}
								aria-label={t("ColorPicker")}
								className="w-10 h-10 p-0 border"
							/>
							<Input
								{...register(`colors.${idx}.name`)}
								aria-label={t("ColorName")}
								placeholder={t("ColorName")}
							/>
							{colorFields.length > 1 && (
								<Button
									aria-label={t("DeleteColor")}
									onClick={() => handleRemove(idx)}
									size="icon"
									type="button"
									variant="ghost"
								>
									✕
								</Button>
							)}
						</div>
						<div className="flex items-center gap-2">
							<Label
								className="w-20"
								htmlFor={`colors.${idx}.type`}
							>
								{t("Type")}
							</Label>
							<Select
								defaultValue={color.type}
								onValueChange={(value: ColorType) =>
									setValue(`colors.${idx}.type`, value)
								}
							>
								<SelectTrigger
									className="w-full"
									id={`colors.${idx}.type`}
								>
									<SelectValue
										placeholder={t("SelectType")}
									/>
								</SelectTrigger>
								<SelectContent>
									{colorTypes.map((type) => (
										<SelectItem key={type} value={type}>
											{type.charAt(0).toUpperCase() +
												type.slice(1)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				))}
				<Button
					aria-label={t("AddColor")}
					onClick={handleAdd}
					size="sm"
					type="button"
					variant="outline"
				>
					<span className="w-4 h-4 mr-1">+</span> {t("AddColor")}
				</Button>
			</CardContent>
		</Card>
	);
});

export default ColorPaletteEditor;
