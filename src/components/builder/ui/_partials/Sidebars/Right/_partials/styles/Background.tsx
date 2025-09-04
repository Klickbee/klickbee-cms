"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useStyleState } from "@/builder/hooks/useStyleState";
import {
	BackgroundStyle,
	ImagePosition,
	ImageSize,
} from "@/builder/types/components/properties/componentStylePropsType";
import PropertyRow from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyRow";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import BackgroundPicker from "../pickers/BackgroundPicker";

type BackgroundType = "color" | "gradient" | "image";

export default function BuilderStyleBackground() {
	const t = useTranslations("Builder.RightSidebar.Background");
	const [isOpen, setIsOpen] = useState(false);
	const [backgroundType, setBackgroundType] =
		useState<BackgroundType>("color");
	const { state: background, updateProperty } =
		useStyleState<BackgroundStyle>({
			color: "#171717",
			gradient: {
				angle: { number: 90, unit: "deg" },
				colors: ["#0052d4", "#6fb1fc"],
				type: "linear",
			},
			image: {
				position: "center",
				repeat: "no-repeat",
				size: "cover",
				src: "",
			},
		});

	const getBackgroundPreview = () => {
		switch (backgroundType) {
			case "color":
				return (
					<div
						className="w-4 h-4 rounded border border-zinc-200"
						style={{ backgroundColor: background.color as string }}
					/>
				);
			case "gradient": {
				const gradientCSS = background.gradient
					? `${background.gradient.type}-gradient(${background.gradient.angle?.number || 90}${background.gradient.angle?.unit || "deg"}, ${background.gradient.colors.join(", ")})`
					: "linear-gradient(90deg, #0052d4, #6fb1fc)";
				return (
					<div
						className="w-4 h-4 rounded border border-zinc-200"
						style={{ background: gradientCSS }}
					/>
				);
			}
			case "image":
				return (
					<div className="w-4 h-4 rounded border border-zinc-200 bg-gray-300" />
				);
		}
	};

	const getBackgroundText = () => {
		switch (backgroundType) {
			case "color":
				return background.color as string;
			case "gradient":
				return t("gradient");
			case "image":
				return t("image");
		}
	};

	const handleTypeChange = (type: BackgroundType) => {
		setBackgroundType(type);
	};

	// Convert BackgroundStyle to BackgroundPicker props format
	const getColorValue = () => {
		return typeof background.color === "string"
			? background.color
			: "#171717";
	};

	const getGradientValue = () => {
		if (background.gradient) {
			return `${background.gradient.type}-gradient(${background.gradient.angle?.number || 90}${background.gradient.angle?.unit || "deg"}, ${background.gradient.colors.join(", ")})`;
		}
		return "linear-gradient(90deg, #0052d4, #6fb1fc)";
	};

	const getImageValue = () => {
		if (background.image) {
			const position =
				typeof background.image.position === "string"
					? background.image.position
					: "center";
			return {
				position,
				size: background.image.size || "cover",
				url: background.image.src || "",
			};
		}
		return {
			position: "center",
			size: "cover",
			url: "",
		};
	};

	return (
		<PropertyRow label={t("title")}>
			<Popover onOpenChange={setIsOpen} open={isOpen}>
				<PopoverTrigger asChild>
					<Button
						className="w-[150px] h-8 justify-start text-left font-normal"
						variant="outline"
					>
						<div className="flex items-center gap-2 flex-1">
							{getBackgroundPreview()}
							<span className="flex-1 text-xs truncate">
								{getBackgroundText()}
							</span>
						</div>
						<ChevronDown className="h-3 w-3 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align="center"
					className="w-80 p-0"
					side="bottom"
				>
					<div className="p-3">
						{/* Contenu selon le type avec sélecteur intégré */}
						<BackgroundPicker
							colorValue={getColorValue()}
							gradientValue={getGradientValue()}
							imageValue={getImageValue()}
							onClose={() => setIsOpen(false)}
							onColorChange={(color) =>
								updateProperty("color", color)
							}
							onGradientChange={() => {
								// Parse CSS gradient back to BackgroundStyle format
								// For now, use a simple approach - this could be enhanced
								updateProperty("gradient", {
									angle: { number: 90, unit: "deg" },
									colors: ["#0052d4", "#6fb1fc"], // Default values
									type: "linear",
								});
							}}
							onImageChange={(image) => {
								if (image) {
									updateProperty("image", {
										position:
											image.position as ImagePosition,
										repeat: "no-repeat",
										size: image.size as ImageSize,
										src: image.url,
									});
								}
							}}
							onTypeChange={handleTypeChange}
							selectedType={backgroundType}
						/>
					</div>
				</PopoverContent>
			</Popover>
		</PropertyRow>
	);
}
