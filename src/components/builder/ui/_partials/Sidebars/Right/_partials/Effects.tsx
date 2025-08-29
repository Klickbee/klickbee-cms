"use client";

import { Minus, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useStyleState } from "@/builder/hooks/useStyleState";
import {
	AnimationType,
	BackdropFilter,
	BoxShadowStyle,
	EffectsStyle,
	TextShadowStyle,
	TimingFunction,
} from "@/builder/types/components/properties/componentStylePropsType";
import SimpleUnitInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/SimpleUnitInput";
import PropertyRow from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyRow";
import BasicColorPicker from "@/components/builder/ui/_partials/Sidebars/Right/_partials/pickers/BasicColorPicker";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"; // Helper function to create a default box shadow

// Helper function to create a default box shadow
const createDefaultBoxShadow = (): BoxShadowStyle => ({
	blur: { number: 4, unit: "%" },
	color: "#000000",
	opacity: { number: 100, unit: "%" },
	spread: { number: 0, unit: "%" },
	x: { number: 0, unit: "px" },
	y: { number: 2, unit: "px" },
});

// Helper function to create a default text shadow
const createDefaultTextShadow = (): TextShadowStyle => ({
	blur: { number: 2, unit: "%" },
	color: "#000000",
	opacity: { number: 100, unit: "%" },
	spread: { number: 0, unit: "%" },
	x: { number: 1, unit: "px" },
	y: { number: 1, unit: "px" },
});

export default function BuilderStyleEffects() {
	const t = useTranslations("Builder.RightSidebar.Effects");
	const {
		state: effects,
		updateProperty,
		addArrayItem,
		removeArrayItem,
		updateArrayItemProperty,
	} = useStyleState<EffectsStyle>({
		animation: {
			duration: { number: 500, unit: "ms" },
			type: "none",
		},
		backdropFilter: ["none"],
		hover: {
			backgroundColor: "#171717",
			transition: {
				duration: { number: 300, unit: "ms" },
				timingFunction: "ease",
			},
		},
		opacity: 100,
	});

	const backdropFilterOptions: { value: BackdropFilter; label: string }[] = [
		{ label: t("backdropFilterNone"), value: "none" },
		{ label: t("backdropFilterBlur"), value: "blur" },
		{ label: t("backdropFilterBrightness"), value: "brightness" },
		{ label: t("backdropFilterContrast"), value: "contrast" },
	];

	const transitionTimingOptions: { value: TimingFunction; label: string }[] =
		[
			{ label: t("timingEase"), value: "ease" },
			{ label: t("timingLinear"), value: "linear" },
		];

	const animationTypeOptions: { value: AnimationType; label: string }[] = [
		{ label: t("animationNone"), value: "none" },
		{ label: t("animationFade"), value: "fade" },
		{ label: t("animationSlide"), value: "slide" },
		{ label: t("animationBounce"), value: "bounce" },
	];

	return (
		<div className="flex flex-col gap-3">
			{/* Box Shadow Section */}
			<div className="font-medium text-xs text-zinc-950 w-full">
				<p className="leading-[16px]">{t("boxShadow")}</p>
			</div>

			{/* Box Shadows List */}
			{effects.boxShadows?.map((boxShadow, index) => (
				<Popover key={index}>
					<PopoverTrigger asChild>
						<div className="content-stretch flex gap-2 items-start justify-start relative shrink-0 w-full cursor-pointer">
							<div className="basis-0 bg-[#ffffff] box-border content-stretch flex gap-2 grow h-8 items-center justify-start min-h-px min-w-px p-[8px] relative rounded-md shrink-0">
								<div className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
								<Sparkles className="size-4 text-zinc-950 shrink-0" />
								<div className="basis-0 content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px relative shrink-0">
									<div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-zinc-950">
										<p className="leading-[16px] whitespace-pre">
											{t("boxShadow")}
										</p>
									</div>
								</div>
							</div>
							<Button
								className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-3 py-0 relative rounded-md shrink-0 size-8"
								onClick={(e) => {
									e.stopPropagation();
									removeArrayItem("boxShadows", index);
								}}
								size="sm"
								variant="outline"
							>
								<div className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-md" />
								<Minus className="size-4" />
							</Button>
						</div>
					</PopoverTrigger>
					<PopoverContent
						align="start"
						className="w-[310px] p-3"
						side="bottom"
					>
						{boxShadow && (
							<div className="flex flex-col gap-2">
								{/* Shadow Color */}
								<PropertyRow label={t("shadowColor")}>
									<BasicColorPicker
										onChange={(color) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"color",
												color,
											)
										}
										value={boxShadow.color as string}
									/>
								</PropertyRow>

								{/* Opacity */}
								<PropertyRow label={t("opacity")}>
									<SimpleUnitInput
										onUnitChange={(unit) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"opacity",
												{
													number: boxShadow.opacity
														.number,
													unit: unit as "%",
												},
											)
										}
										onValueChange={(number) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"opacity",
												{
													number,
													unit: boxShadow.opacity
														.unit,
												},
											)
										}
										unit={boxShadow.opacity.unit}
										value={boxShadow.opacity.number}
									/>
								</PropertyRow>

								{/* X Offset */}
								<PropertyRow label={t("xOffset")}>
									<SimpleUnitInput
										onUnitChange={(unit) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"x",
												{
													number: boxShadow.x.number,
													unit,
												},
											)
										}
										onValueChange={(number) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"x",
												{
													number,
													unit: boxShadow.x.unit,
												},
											)
										}
										unit={boxShadow.x.unit}
										value={boxShadow.x.number}
									/>
								</PropertyRow>

								{/* Y Offset */}
								<PropertyRow label={t("yOffset")}>
									<SimpleUnitInput
										onUnitChange={(unit) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"y",
												{
													number: boxShadow.y.number,
													unit,
												},
											)
										}
										onValueChange={(number) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"y",
												{
													number,
													unit: boxShadow.y.unit,
												},
											)
										}
										unit={boxShadow.y.unit}
										value={boxShadow.y.number}
									/>
								</PropertyRow>

								{/* Blur */}
								<PropertyRow label={t("blur")}>
									<SimpleUnitInput
										onUnitChange={(unit) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"blur",
												{
													number: boxShadow.blur
														.number,
													unit,
												},
											)
										}
										onValueChange={(number) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"blur",
												{
													number,
													unit: boxShadow.blur.unit,
												},
											)
										}
										unit={boxShadow.blur.unit}
										value={boxShadow.blur.number}
									/>
								</PropertyRow>

								{/* Spread */}
								<PropertyRow label={t("spreadRadius")}>
									<SimpleUnitInput
										onUnitChange={(unit) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"spread",
												{
													number: boxShadow.spread
														.number,
													unit,
												},
											)
										}
										onValueChange={(number) =>
											updateArrayItemProperty(
												"boxShadows",
												index,
												"spread",
												{
													number,
													unit: boxShadow.spread.unit,
												},
											)
										}
										unit={boxShadow.spread.unit}
										value={boxShadow.spread.number}
									/>
								</PropertyRow>
							</div>
						)}
					</PopoverContent>
				</Popover>
			))}

			<Button
				className="bg-[#ffffff] box-border content-stretch flex gap-1.5 h-[34px] items-center justify-center px-4 py-1.5 relative rounded-md shrink-0 w-full"
				onClick={() =>
					addArrayItem("boxShadows", createDefaultBoxShadow())
				}
				variant="outline"
			>
				<div className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
				<div className="content-stretch flex gap-2.5 items-center justify-center relative shrink-0">
					<div className="font-medium leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-zinc-950">
						<p className="leading-[16px] whitespace-pre">
							{t("addMoreBoxShadow")}
						</p>
					</div>
				</div>
			</Button>

			{/* Text Shadow Section */}
			<div className="font-medium text-xs text-zinc-950 w-full">
				<p className="leading-[16px]">{t("textShadow")}</p>
			</div>

			{/* Text Shadows List */}
			{effects.textShadows?.map((textShadow, index) => (
				<Popover key={index}>
					<PopoverTrigger asChild>
						<div className="content-stretch flex gap-2 items-start justify-start relative shrink-0 w-full cursor-pointer">
							<div className="basis-0 bg-[#ffffff] box-border content-stretch flex gap-2 grow h-8 items-center justify-start min-h-px min-w-px p-[8px] relative rounded-md shrink-0">
								<div className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
								<Sparkles className="size-4 text-zinc-950 shrink-0" />
								<div className="basis-0 content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px relative shrink-0">
									<div className="font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-zinc-950">
										<p className="leading-[16px] whitespace-pre">
											{t("textShadow")}
										</p>
									</div>
								</div>
							</div>
							<Button
								className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-3 py-0 relative rounded-md shrink-0 size-8"
								onClick={(e) => {
									e.stopPropagation();
									removeArrayItem("textShadows", index);
								}}
								size="sm"
								variant="outline"
							>
								<div className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-md" />
								<Minus className="size-4" />
							</Button>
						</div>
					</PopoverTrigger>
					<PopoverContent
						align="start"
						className="w-[310px] p-3"
						side="bottom"
					>
						{textShadow && (
							<div className="flex flex-col gap-2">
								{/* Shadow Color */}
								<PropertyRow label={t("shadowColor")}>
									<BasicColorPicker
										onChange={(color) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"color",
												color,
											)
										}
										value={textShadow.color as string}
									/>
								</PropertyRow>

								{/* Opacity */}
								<PropertyRow label={t("opacity")}>
									<SimpleUnitInput
										onUnitChange={(unit) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"opacity",
												{
													number: textShadow.opacity
														.number,
													unit: unit as "%",
												},
											)
										}
										onValueChange={(number) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"opacity",
												{
													number,
													unit: textShadow.opacity
														.unit,
												},
											)
										}
										unit={textShadow.opacity.unit}
										value={textShadow.opacity.number}
									/>
								</PropertyRow>

								{/* X Offset */}
								<PropertyRow label={t("xOffset")}>
									<SimpleUnitInput
										onUnitChange={(unit) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"x",
												{
													number: textShadow.x.number,
													unit,
												},
											)
										}
										onValueChange={(number) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"x",
												{
													number,
													unit: textShadow.x.unit,
												},
											)
										}
										unit={textShadow.x.unit}
										value={textShadow.x.number}
									/>
								</PropertyRow>

								{/* Y Offset */}
								<PropertyRow label={t("yOffset")}>
									<SimpleUnitInput
										onUnitChange={(unit) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"y",
												{
													number: textShadow.y.number,
													unit,
												},
											)
										}
										onValueChange={(number) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"y",
												{
													number,
													unit: textShadow.y.unit,
												},
											)
										}
										unit={textShadow.y.unit}
										value={textShadow.y.number}
									/>
								</PropertyRow>

								{/* Blur */}
								<PropertyRow label={t("blur")}>
									<SimpleUnitInput
										onUnitChange={(unit) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"blur",
												{
													number: textShadow.blur
														.number,
													unit,
												},
											)
										}
										onValueChange={(number) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"blur",
												{
													number,
													unit: textShadow.blur.unit,
												},
											)
										}
										unit={textShadow.blur.unit}
										value={textShadow.blur.number}
									/>
								</PropertyRow>

								{/* Spread */}
								<PropertyRow label={t("spreadRadius")}>
									<SimpleUnitInput
										onUnitChange={(unit) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"spread",
												{
													number: textShadow.spread
														.number,
													unit,
												},
											)
										}
										onValueChange={(number) =>
											updateArrayItemProperty(
												"textShadows",
												index,
												"spread",
												{
													number,
													unit: textShadow.spread
														.unit,
												},
											)
										}
										unit={textShadow.spread.unit}
										value={textShadow.spread.number}
									/>
								</PropertyRow>
							</div>
						)}
					</PopoverContent>
				</Popover>
			))}

			<Button
				className="bg-[#ffffff] box-border content-stretch flex gap-1.5 h-[34px] items-center justify-center px-4 py-1.5 relative rounded-md shrink-0 w-full"
				onClick={() =>
					addArrayItem("textShadows", createDefaultTextShadow())
				}
				variant="outline"
			>
				<div className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
				<div className="content-stretch flex gap-2.5 items-center justify-center relative shrink-0">
					<div className="font-medium leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-zinc-950">
						<p className="leading-[16px] whitespace-pre">
							{t("addMoreTextShadow")}
						</p>
					</div>
				</div>
			</Button>

			{/* Opacity */}
			<PropertyRow label={t("opacity")}>
				<SimpleUnitInput
					onUnitChange={() => {
						// Opacity is always in %
					}}
					onValueChange={(opacity) =>
						updateProperty("opacity", opacity)
					}
					unit="%"
					value={effects.opacity || 100}
				/>
			</PropertyRow>

			{/* Backdrop Filter */}
			<PropertyRow label={t("backdropFilter")}>
				<Select
					onValueChange={(backdropFilter) =>
						updateProperty("backdropFilter", [
							backdropFilter as BackdropFilter,
						])
					}
					value={effects.backdropFilter?.[0] || "none"}
				>
					<SelectTrigger className="h-8 w-full text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{backdropFilterOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</PropertyRow>

			{/* Hover State Controls */}
			<div className="font-medium text-xs text-zinc-950 w-full">
				<p className="leading-[16px]">{t("hoverStateControls")}</p>
			</div>

			{/* Background Color */}
			<PropertyRow label={t("backgroundColor")}>
				<BasicColorPicker
					onChange={(backgroundColor) =>
						updateProperty("hover", {
							...effects.hover,
							backgroundColor,
						})
					}
					value={effects.hover?.backgroundColor || "#171717"}
				/>
			</PropertyRow>

			{/* Text Color */}
			<PropertyRow label={t("textColor")}>
				<BasicColorPicker
					onChange={(textColor) =>
						updateProperty("hover", {
							...effects.hover,
							textColor,
						})
					}
					value={effects.hover?.textColor || "#171717"}
				/>
			</PropertyRow>

			{/* Transitions Duration */}
			<PropertyRow label={t("transitionsDuration")}>
				<SimpleUnitInput
					onUnitChange={(unit) =>
						updateProperty("hover", {
							...effects.hover,
							transition: {
								duration: {
									number:
										effects.hover?.transition?.duration
											.number || 300,
									unit,
								},
								timingFunction:
									effects.hover?.transition?.timingFunction ||
									"ease",
							},
						})
					}
					onValueChange={(number) =>
						updateProperty("hover", {
							...effects.hover,
							transition: {
								duration: {
									number,
									unit:
										effects.hover?.transition?.duration
											.unit || "ms",
								},
								timingFunction:
									effects.hover?.transition?.timingFunction ||
									"ease",
							},
						})
					}
					unit={effects.hover?.transition?.duration.unit || "ms"}
					value={effects.hover?.transition?.duration.number || 300}
				/>
			</PropertyRow>

			{/* Transitions Timing */}
			<PropertyRow label={t("transitionsTiming")}>
				<Select
					onValueChange={(timingFunction) =>
						updateProperty("hover", {
							...effects.hover,
							transition: {
								duration: effects.hover?.transition
									?.duration || {
									number: 300,
									unit: "ms",
								},
								timingFunction:
									timingFunction as TimingFunction,
							},
						})
					}
					value={effects.hover?.transition?.timingFunction || "ease"}
				>
					<SelectTrigger className="h-8 w-full text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{transitionTimingOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</PropertyRow>

			{/* Animations Type */}
			<PropertyRow label={t("animationsType")}>
				<Select
					onValueChange={(animationType) =>
						updateProperty("animation", {
							duration: effects.animation?.duration || {
								number: 500,
								unit: "ms",
							},
							type: animationType as AnimationType,
						})
					}
					value={effects.animation?.type || "none"}
				>
					<SelectTrigger className="h-8 w-full text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{animationTypeOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</PropertyRow>

			{/* Animations Duration */}
			<PropertyRow label={t("animationsDuration")}>
				<SimpleUnitInput
					onUnitChange={(unit) =>
						updateProperty("animation", {
							duration: {
								number:
									effects.animation?.duration.number || 500,
								unit,
							},
							type: effects.animation?.type || "none",
						})
					}
					onValueChange={(number) =>
						updateProperty("animation", {
							duration: {
								number,
								unit: effects.animation?.duration.unit || "ms",
							},
							type: effects.animation?.type || "none",
						})
					}
					unit={effects.animation?.duration.unit || "ms"}
					value={effects.animation?.duration.number || 500}
				/>
			</PropertyRow>
		</div>
	);
}
