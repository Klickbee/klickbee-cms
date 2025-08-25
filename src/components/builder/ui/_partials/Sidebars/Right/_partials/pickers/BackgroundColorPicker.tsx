"use client";

import { useTranslations } from "next-intl";
import ColorPickerContent from "@/components/builder/ui/_partials/Sidebars/Right/_partials/pickers/ColorPickerContent";
import TypeSelector from "@/components/builder/ui/_partials/Sidebars/Right/_partials/pickers/TypeSelector";

interface BackgroundColorPickerProps {
	value: string;
	onChange: (color: string) => void;
	onTypeChange: (type: "color" | "gradient" | "image") => void;
	selectedType: "color" | "gradient" | "image";
	closeColorPicker: () => void;
}

export default function BackgroundColorPicker({
	value,
	onChange,
	onTypeChange,
	selectedType,
	closeColorPicker,
}: BackgroundColorPickerProps) {
	const t = useTranslations("Builder.RightSidebar.Background");

	const typeOptions = [
		{ label: t("solid"), value: "color" },
		{ label: t("gradient"), value: "gradient" },
		{ label: t("image"), value: "image" },
	];

	return (
		<div className="space-y-3">
			{/* Sélecteur de type */}
			<TypeSelector
				onValueChange={(type) =>
					onTypeChange(type as "color" | "gradient" | "image")
				}
				options={typeOptions}
				value={selectedType}
			/>

			{/* ColorPickerContent */}
			<ColorPickerContent
				closeColorPicker={closeColorPicker}
				onChange={onChange}
				value={value}
			/>
		</div>
	);
}
