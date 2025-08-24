"use client";

import { useTranslations } from "next-intl";
import ImagePickerContent from "@/components/builder/ui/ImagePickerContent";
import TypeSelector from "@/components/builder/ui/TypeSelector";

interface BackgroundImagePickerProps {
	value: {
		url: string;
		size: string;
		position: string;
	};
	onChange: (image: BackgroundImagePickerProps["value"]) => void;
	onTypeChange: (type: "color" | "gradient" | "image") => void;
	selectedType: "color" | "gradient" | "image";
}

export default function BackgroundImagePicker({
	value,
	onChange,
	onTypeChange,
	selectedType,
}: BackgroundImagePickerProps) {
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

			{/* ImagePickerContent */}
			<ImagePickerContent onChange={onChange} value={value} />
		</div>
	);
}
