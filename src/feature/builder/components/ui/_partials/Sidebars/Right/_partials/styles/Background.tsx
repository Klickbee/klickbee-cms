"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import PropertyRow from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyRow";
import { STYLE_DEFAULTS } from "@/feature/builder/constants/styleDefaults";
import { useStyleProps } from "@/feature/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/feature/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import {
	BackgroundStyle,
	ImageSize,
} from "@/feature/builder/types/components/properties/componentStylePropsType";
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
		<>
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
										updateNestedProperty(
											"background",
											() => ({
												gradient: undefined,
											}),
										);
										updateNestedProperty(
											"background",
											() => ({
												image: undefined,
											}),
										);
									} else if (type === "gradient") {
										updateNestedProperty(
											"background",
											() => ({
												image: undefined,
											}),
										);
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
										updateNestedProperty(
											"background",
											() => ({
												gradient: undefined,
											}),
										);
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
			<PropertyRow label="Overlay">
				<div className="flex items-center mt-2 gap-2">
					{/* Overlay type + editor popover */}
					{(() => {
						const overlayType: "color" | "gradient" =
							backgroundStyle.overlay?.gradient
								? "gradient"
								: "color";
						const overlayPreviewStyle =
							overlayType === "color"
								? {
										backgroundColor: String(
											backgroundStyle.overlay?.color ||
												"#000000",
										),
									}
								: {
										background: getGradientCSS(
											backgroundStyle.overlay?.gradient,
										),
									};
						const overlayText =
							overlayType === "color"
								? String(
										backgroundStyle.overlay?.color ||
											"#000000",
									)
								: t("gradient");
						return (
							<Popover>
								<PopoverTrigger asChild>
									<Button
										className="w-[150px] h-8 justify-start text-left font-normal"
										variant="outline"
									>
										<div className="flex items-center gap-2 flex-1">
											<div
												className="w-4 h-4 rounded border border-zinc-200"
												style={overlayPreviewStyle}
											/>
											<span className="flex-1 text-xs truncate">
												{overlayText}
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
											allowedTypes={["color", "gradient"]}
											colorValue={String(
												backgroundStyle.overlay
													?.color || "#000000",
											)}
											gradientValue={
												backgroundStyle.overlay
													?.gradient
											}
											onColorChange={(color) =>
												updateNestedProperty(
													"background",
													(curr) => ({
														...curr,
														overlay: {
															...(curr?.overlay ?? {
																opacity: 0.4,
															}),
															color,
															gradient: undefined,
														},
													}),
												)
											}
											onGradientChange={(gradient) =>
												updateNestedProperty(
													"background",
													(curr) => ({
														...curr,
														overlay: {
															...(curr?.overlay ?? {
																opacity: 0.4,
																color: "#000000",
															}),
															gradient,
															color: undefined,
														},
													}),
												)
											}
											onTypeChange={(type) => {
												if (type === "color") {
													updateNestedProperty(
														"background",
														(curr) => ({
															...curr,
															overlay: {
																...(curr?.overlay ?? {
																	opacity: 0.4,
																}),
																gradient:
																	undefined,
																color: String(
																	curr
																		?.overlay
																		?.color ||
																		"#000000",
																),
															},
														}),
													);
												} else {
													updateNestedProperty(
														"background",
														(curr) => ({
															...curr,
															overlay: {
																...(curr?.overlay ?? {
																	opacity: 0.4,
																	color: "#000000",
																}),
																gradient: curr
																	?.overlay
																	?.gradient ?? {
																	angle: 90,
																	colors: [
																		"#0052d4",
																		"#6fb1fc",
																	],
																	positions: [
																		0, 100,
																	],
																	type: "linear",
																},
																color: undefined,
															},
														}),
													);
												}
											}}
											selectedType={overlayType}
										/>
									</div>
								</PopoverContent>
							</Popover>
						);
					})()}

					{/* Opacity */}
					<div className="relative w-[90px]">
						<Input
							className="h-8 text-xs pr-6"
							max={100}
							min={0}
							onChange={(e) => {
								const val = Math.max(
									0,
									Math.min(
										100,
										parseInt(e.target.value || "0", 10),
									),
								);
								updateNestedProperty("background", (curr) => ({
									...curr,
									overlay: {
										...(curr?.overlay ?? {
											color: "#000000",
											gradient: undefined,
										}),
										opacity: val / 100,
									},
								}));
							}}
							type="number"
							value={
								Math.round(
									(backgroundStyle.overlay?.opacity ?? 40) *
										100,
								) /
									100 >
								100
									? 100
									: Math.round(
											(backgroundStyle.overlay?.opacity ??
												0.4) * 100,
										)
							}
						/>
						<span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
							%
						</span>
					</div>
				</div>
			</PropertyRow>
		</>
	);
}
