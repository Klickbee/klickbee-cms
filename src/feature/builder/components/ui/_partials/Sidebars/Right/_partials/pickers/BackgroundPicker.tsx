"use client";

import { useTranslations } from "next-intl";
import {
	BackgroundAttachment,
	BackgroundStyle,
	ImagePosition,
	ImageRepeat,
	ImageSize,
	SpacingValue,
} from "@/feature/builder/types/components/properties/componentStylePropsType";
import ColorPickerContent from "./ColorPickerContent";
import GradientPickerContent from "./GradientPickerContent";
import ImagePickerContent from "./ImagePickerContent";
import TypeSelector from "./TypeSelector";

interface BackgroundPickerProps {
	selectedType: "color" | "gradient" | "image";
	onTypeChange: (type: "color" | "gradient" | "image") => void;
	colorValue?: string;
	onColorChange?: (color: string) => void;
	gradientValue?: BackgroundStyle["gradient"];
	onGradientChange?: (gradient: BackgroundStyle["gradient"]) => void;
	imageValue?: {
		src: string;
		size?: ImageSize;
		position?: ImagePosition | { x: SpacingValue; y: SpacingValue };
		repeat?: ImageRepeat;
		attachment?: BackgroundAttachment;
	};
	onImageChange?: (image: BackgroundPickerProps["imageValue"]) => void;
	allowedTypes?: Array<"color" | "gradient" | "image">;
}

export default function BackgroundPicker({
	selectedType,
	onTypeChange,
	colorValue = "",
	onColorChange,
	gradientValue,
	onGradientChange,
	imageValue = { position: "center", size: "cover", src: "" },
	onImageChange,
	allowedTypes = ["color", "gradient", "image"],
}: BackgroundPickerProps) {
	const t = useTranslations("Builder.RightSidebar.Background");

	const typeOptions = [
		{ label: t("solid"), value: "color" },
		{ label: t("gradient"), value: "gradient" },
		{ label: t("image"), value: "image" },
	];

	const gradientTypeOptions = [
		{ label: t("linear"), value: "linear" },
		{ label: t("radial"), value: "radial" },
	];

	const handleGradientTypeChange = (type: string) => {
		if (!onGradientChange) return;

		const currentGradient = gradientValue || {
			angle: 90,
			colors: ["#0052d4", "#6fb1fc"] as [string, string],
			positions: [0, 100] as [number, number],
			type: "linear" as const,
		};

		onGradientChange({
			...currentGradient,
			angle: type === "linear" ? currentGradient.angle || 90 : 0,
			type: type as "linear" | "radial",
		});
	};

	return (
		<div className="space-y-3">
			{selectedType === "gradient" ? (
				<div className="flex gap-3">
					<TypeSelector
						className="flex-1"
						onValueChange={(value) =>
							onTypeChange(
								value as "color" | "gradient" | "image",
							)
						}
						options={typeOptions}
						value={selectedType}
					/>
					<TypeSelector
						className="flex-1"
						onValueChange={handleGradientTypeChange}
						options={gradientTypeOptions}
						value={gradientValue?.type || "linear"}
					/>
				</div>
			) : (
				<TypeSelector
					onValueChange={(value) =>
						onTypeChange(value as "color" | "gradient" | "image")
					}
					options={typeOptions}
					value={selectedType}
				/>
			)}

			{selectedType === "color" && onColorChange && (
				<ColorPickerContent
					onChange={onColorChange}
					value={colorValue}
				/>
			)}
			{selectedType === "gradient" && onGradientChange && (
				<GradientPickerContent
					onChange={onGradientChange}
					value={gradientValue}
				/>
			)}
			{selectedType === "image" && onImageChange && (
				<ImagePickerContent
					onChange={onImageChange}
					value={imageValue}
				/>
			)}
		</div>
	);
}
