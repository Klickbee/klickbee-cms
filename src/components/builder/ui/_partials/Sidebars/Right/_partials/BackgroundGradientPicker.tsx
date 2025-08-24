"use client";

import { useTranslations } from "next-intl";
import GradientPickerContent from "@/components/builder/ui/GradientPickerContent";
import TypeSelector from "@/components/builder/ui/TypeSelector";

interface BackgroundGradientPickerProps {
	value: string; // Gradient CSS string
	onChange: (gradient: string) => void;
	onTypeChange: (type: "color" | "gradient" | "image") => void;
	selectedType: "color" | "gradient" | "image";
	closeGradientPicker: () => void;
}

export default function BackgroundGradientPicker({
	value,
	onChange,
	onTypeChange,
	selectedType,
	closeGradientPicker,
}: BackgroundGradientPickerProps) {
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

	return (
		<div className="space-y-3">
			{/* Sélecteurs côte à côte */}
			<div className="flex gap-3">
				<TypeSelector
					className="flex-1"
					onValueChange={(type) =>
						onTypeChange(type as "color" | "gradient" | "image")
					}
					options={typeOptions}
					value={selectedType}
				/>
				<TypeSelector
					className="flex-1"
					onValueChange={(type) => {
						// Récupérer le gradient actuel et changer juste le type
						const currentGradient =
							value ||
							"linear-gradient(0deg, #ff0000 0%, #0000ff 100%)";
						const newGradient = currentGradient.includes(
							"linear-gradient",
						)
							? currentGradient.replace(
									"linear-gradient",
									type === "radial"
										? "radial-gradient"
										: "linear-gradient",
								)
							: type === "linear"
								? currentGradient.replace(
										"radial-gradient",
										"linear-gradient",
									)
								: currentGradient.replace(
										"linear-gradient",
										"radial-gradient",
									);
						onChange(newGradient);
					}}
					options={gradientTypeOptions}
					value={
						value?.includes("radial-gradient") ? "radial" : "linear"
					}
				/>
			</div>

			{/* GradientPickerContent */}
			<GradientPickerContent
				closeGradientPicker={closeGradientPicker}
				onChange={onChange}
				value={value}
			/>
		</div>
	);
}
