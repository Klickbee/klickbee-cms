"use client";

import { useTranslations } from "next-intl";
import ColorPickerContent from "./ColorPickerContent";
import GradientPickerContent from "./GradientPickerContent";
import ImagePickerContent from "./ImagePickerContent";
import TypeSelector from "./TypeSelector";

interface BackgroundPickerProps {
	// Props communes
	selectedType: "color" | "gradient" | "image";
	onTypeChange: (type: "color" | "gradient" | "image") => void;
	onClose?: () => void;

	// Props spécifiques selon le type
	colorValue?: string;
	onColorChange?: (color: string) => void;

	gradientValue?: string;
	onGradientChange?: (gradient: string) => void;

	imageValue?: {
		url: string;
		size: string;
		position: string;
	};
	onImageChange?: (image: BackgroundPickerProps["imageValue"]) => void;
}

export default function BackgroundPicker({
	selectedType,
	onTypeChange,
	onClose,
	colorValue = "",
	onColorChange,
	gradientValue = "",
	onGradientChange,
	imageValue = { position: "center", size: "cover", url: "" },
	onImageChange,
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

		// Récupérer le gradient actuel et changer juste le type
		const currentGradient =
			gradientValue || "linear-gradient(0deg, #ff0000 0%, #0000ff 100%)";
		const newGradient = currentGradient.includes("linear-gradient")
			? currentGradient.replace(
					"linear-gradient",
					type === "radial" ? "radial-gradient" : "linear-gradient",
				)
			: type === "linear"
				? currentGradient.replace("radial-gradient", "linear-gradient")
				: currentGradient.replace("linear-gradient", "radial-gradient");

		onGradientChange(newGradient);
	};

	const renderTypeSelectors = () => {
		if (selectedType === "gradient") {
			// Double sélecteur pour gradient (type + gradient type)
			return (
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
						value={
							gradientValue?.includes("radial-gradient")
								? "radial"
								: "linear"
						}
					/>
				</div>
			);
		}

		// Sélecteur simple pour color et image
		return (
			<TypeSelector
				onValueChange={(value) =>
					onTypeChange(value as "color" | "gradient" | "image")
				}
				options={typeOptions}
				value={selectedType}
			/>
		);
	};

	const renderContent = () => {
		switch (selectedType) {
			case "color":
				return onColorChange ? (
					<ColorPickerContent
						closeColorPicker={
							onClose ||
							(() => {
								/* Noop */
							})
						}
						onChange={onColorChange}
						value={colorValue}
					/>
				) : null;

			case "gradient":
				return onGradientChange ? (
					<GradientPickerContent
						closeGradientPicker={
							onClose ||
							(() => {
								/* Noop */
							})
						}
						onChange={onGradientChange}
						value={gradientValue}
					/>
				) : null;

			case "image":
				return onImageChange ? (
					<ImagePickerContent
						onChange={onImageChange}
						value={imageValue}
					/>
				) : null;

			default:
				return null;
		}
	};

	return (
		<div className="space-y-3">
			{/* Sélecteur(s) de type */}
			{renderTypeSelectors()}

			{/* Contenu selon le type */}
			{renderContent()}
		</div>
	);
}
