"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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

export default function BuilderStyleBackground() {
	const t = useTranslations("Builder.RightSidebar.Background");
	const [isOpen, setIsOpen] = useState(false);
	const [selectedType, setSelectedType] = useState<
		"color" | "gradient" | "image"
	>("color");
	const { state: background, updateProperty } =
		useStyleState<BackgroundStyle>({
			color: "#171717",
			gradient: {
				angle: 90,
				colors: ["#0052d4", "#6fb1fc"],
				positions: [0, 100],
				type: "linear",
			},
			image: {
				position: "center",
				repeat: "no-repeat",
				size: "cover",
				src: "",
			},
		});

	useEffect(() => {
		const detectedType = background.image?.src
			? "image"
			: background.gradient
				? "gradient"
				: "color";
		setSelectedType(detectedType);
	}, []);

	const backgroundType = selectedType;

	const getGradientCSS = (gradient: BackgroundStyle["gradient"]) => {
		if (!gradient)
			return "linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%)";

		if (gradient.type === "linear") {
			return `linear-gradient(${gradient.angle || 90}deg, ${gradient.colors[0]} ${gradient.positions[0]}%, ${gradient.colors[1]} ${gradient.positions[1]}%)`;
		} else {
			return `radial-gradient(circle, ${gradient.colors[0]} ${gradient.positions[0]}%, ${gradient.colors[1]} ${gradient.positions[1]}%)`;
		}
	};

	const previewStyle =
		backgroundType === "color"
			? { backgroundColor: background.color as string }
			: backgroundType === "gradient"
				? { background: getGradientCSS(background.gradient) }
				: {};

	const backgroundText =
		backgroundType === "color"
			? (background.color as string)
			: t(backgroundType);

	return (
		<PropertyRow label={t("title")}>
			<Popover onOpenChange={setIsOpen} open={isOpen}>
				<PopoverTrigger asChild>
					<Button
						className="w-[150px] h-8 justify-start text-left font-normal"
						variant="outline"
					>
						<div className="flex items-center gap-2 flex-1">
							<div
								className={`w-4 h-4 rounded border border-zinc-200 ${backgroundType === "image" ? "bg-gray-300" : ""}`}
								style={previewStyle}
							/>
							<span className="flex-1 text-xs truncate">
								{backgroundText}
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
						<BackgroundPicker
							colorValue={
								(background.color as string) || "#171717"
							}
							gradientValue={background.gradient}
							imageValue={
								background.image
									? {
											position:
												typeof background.image
													.position === "string"
													? background.image.position
													: "center",
											size:
												background.image.size ||
												"cover",
											url: background.image.src || "",
										}
									: {
											position: "center",
											size: "cover",
											url: "",
										}
							}
							onColorChange={(color) =>
								updateProperty("color", color)
							}
							onGradientChange={(gradient) =>
								updateProperty("gradient", gradient)
							}
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
							onTypeChange={(type) => {
								setSelectedType(type);
								// Reset other types and set defaults when switching
								if (type === "color") {
									updateProperty("gradient", undefined);
									updateProperty("image", undefined);
								} else if (type === "gradient") {
									updateProperty("image", undefined);
									if (!background.gradient) {
										updateProperty("gradient", {
											angle: 90,
											colors: ["#0052d4", "#6fb1fc"],
											positions: [0, 100],
											type: "linear",
										});
									}
								} else if (type === "image") {
									updateProperty("gradient", undefined);
									if (!background.image) {
										updateProperty("image", {
											position: "center",
											repeat: "no-repeat",
											size: "cover",
											src: "",
										});
									}
								}
							}}
							selectedType={backgroundType}
						/>
					</div>
				</PopoverContent>
			</Popover>
		</PropertyRow>
	);
}
