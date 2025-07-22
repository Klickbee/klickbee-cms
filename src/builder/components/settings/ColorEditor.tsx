import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import type {
	FieldArrayWithId,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";
import { ColorType, colorTypes } from "@/builder/types/settings/ColorSettings";

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
					<div key={color.id} className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<Input
								type="color"
								{...register(`colors.${idx}.hexCode`)}
								aria-label={t("ColorPicker")}
								className="w-10 h-10 p-0 border"
							/>
							<Input
								{...register(`colors.${idx}.name`)}
								placeholder={t("ColorName")}
								aria-label={t("ColorName")}
							/>
							{colorFields.length > 1 && (
								<Button
									type="button"
									variant="ghost"
									size="icon"
									aria-label={t("DeleteColor")}
									onClick={() => handleRemove(idx)}
								>
									✕
								</Button>
							)}
						</div>
						<div className="flex items-center gap-2">
							<Label
								htmlFor={`colors.${idx}.type`}
								className="w-20"
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
									id={`colors.${idx}.type`}
									className="w-full"
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
					type="button"
					variant="outline"
					size="sm"
					onClick={handleAdd}
					aria-label={t("AddColor")}
				>
					<span className="w-4 h-4 mr-1">+</span> {t("AddColor")}
				</Button>
			</CardContent>
		</Card>
	);
});

export default ColorPaletteEditor;
