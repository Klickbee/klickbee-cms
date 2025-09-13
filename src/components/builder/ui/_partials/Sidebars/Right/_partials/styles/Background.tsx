"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { STYLE_DEFAULTS } from "@/builder/constants/styleDefaults";
import { useStyleProps } from "@/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import {
	BackgroundStyle,
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

export default function BuilderStyleBackground({
	component,
}: {
	component: BuilderComponent;
}) {
	const t = useTranslations("Builder.RightSidebar.Background");
	const [isOpen, setIsOpen] = useState(false);
	const [selectedType, setSelectedType] = useState<
		"color" | "gradient" | "image"
	>("color");
	const styleProps = useStyleProps(component, {
		background: STYLE_DEFAULTS.BACKGROUND,
	});
	const backgroundStyle = styleProps.background || STYLE_DEFAULTS.BACKGROUND;
	const { updateNestedProperty } = useStyleUpdate(component);

	useEffect(() => {
		const detectedType = backgroundStyle.image
			? "image"
			: backgroundStyle.gradient
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
			? { backgroundColor: backgroundStyle.color as string }
			: backgroundType === "gradient"
				? { background: getGradientCSS(backgroundStyle.gradient) }
				: {};

	const backgroundText =
		backgroundType === "color"
			? (backgroundStyle.color as string)
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
							colorValue={backgroundStyle.color || "#171717"}
							gradientValue={backgroundStyle.gradient}
							imageValue={
								backgroundStyle.image
									? backgroundStyle.image
									: {
											position: "center",
											size: "cover" as ImageSize,
											src: "",
										}
							}
							onColorChange={(color) =>
								updateNestedProperty(
									"background",
									(currentColor) => ({
										...currentColor,
										color,
									}),
								)
							}
							onGradientChange={(gradient) =>
								updateNestedProperty(
									"background",
									(currentGradient) => ({
										...currentGradient,
										gradient,
									}),
								)
							}
							onImageChange={(image) => {
								if (image) {
									updateNestedProperty(
										"background",
										(currentImage) => ({
											...currentImage,
											image,
										}),
									);
								}
							}}
							onTypeChange={(type) => {
								setSelectedType(type);
								// Reset other types and set defaults when switching
								if (type === "color") {
									updateNestedProperty("background", () => ({
										gradient: undefined,
									}));
									updateNestedProperty("background", () => ({
										image: undefined,
									}));
								} else if (type === "gradient") {
									updateNestedProperty("background", () => ({
										image: undefined,
									}));
									if (!backgroundStyle.gradient) {
										updateNestedProperty(
											"background",
											() => ({
												gradient: {
													angle: 90,
													colors: [
														"#0052d4",
														"#6fb1fc",
													],
													positions: [0, 100],
													type: "linear",
												},
											}),
										);
									}
								} else if (type === "image") {
									updateNestedProperty("background", () => ({
										gradient: undefined,
									}));
									if (!backgroundStyle.image) {
										updateNestedProperty(
											"background",
											() => ({
												image: {
													position: "center",
													repeat: "no-repeat",
													size: "cover",
													src: "",
												},
											}),
										);
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
