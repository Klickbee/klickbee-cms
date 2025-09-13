"use client";

import { Minus, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { STYLE_DEFAULTS } from "@/builder/constants/styleDefaults";
import { useStyleProps } from "@/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import {
	AnimationType,
	BackdropFilter,
	BoxShadowStyle,
	TextShadowStyle,
	TimingFunction,
} from "@/builder/types/components/properties/componentStylePropsType";
import PropertyColorPicker from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyColorPicker";
import PropertySelect from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";
import PropertyUnitInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyUnitInput";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

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

export default function BuilderStyleEffects({
	component,
}: {
	component: BuilderComponent;
}) {
	const t = useTranslations("Builder.RightSidebar.Effects");
	const styleProps = useStyleProps(component, {
		effects: STYLE_DEFAULTS.EFFECT,
	});
	const effects = styleProps.effects || STYLE_DEFAULTS.EFFECT;

	const {
		updateNestedProperty,
		addArrayItem,
		removeArrayItem,
		updateArrayItemProperty,
	} = useStyleUpdate(component);

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
								<PropertyColorPicker
									label={t("shadowColor")}
									layout="row"
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

								{/* Opacity */}
								<PropertyUnitInput
									label={t("opacity")}
									layout="row"
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
												unit: boxShadow.opacity.unit,
											},
										)
									}
									unit={boxShadow.opacity.unit}
									value={boxShadow.opacity.number}
								/>

								{/* X Offset */}
								<PropertyUnitInput
									label={t("xOffset")}
									layout="row"
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

								{/* Y Offset */}
								<PropertyUnitInput
									label={t("yOffset")}
									layout="row"
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

								{/* Blur */}
								<PropertyUnitInput
									label={t("blur")}
									layout="row"
									onUnitChange={(unit) =>
										updateArrayItemProperty(
											"boxShadows",
											index,
											"blur",
											{
												number: boxShadow.blur.number,
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

								{/* Spread */}
								<PropertyUnitInput
									label={t("spreadRadius")}
									layout="row"
									onUnitChange={(unit) =>
										updateArrayItemProperty(
											"boxShadows",
											index,
											"spread",
											{
												number: boxShadow.spread.number,
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
								<PropertyColorPicker
									label={t("shadowColor")}
									layout="row"
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

								{/* Opacity */}
								<PropertyUnitInput
									label={t("opacity")}
									layout="row"
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
												unit: textShadow.opacity.unit,
											},
										)
									}
									unit={textShadow.opacity.unit}
									value={textShadow.opacity.number}
								/>

								{/* X Offset */}
								<PropertyUnitInput
									label={t("xOffset")}
									layout="row"
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

								{/* Y Offset */}
								<PropertyUnitInput
									label={t("yOffset")}
									layout="row"
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

								{/* Blur */}
								<PropertyUnitInput
									label={t("blur")}
									layout="row"
									onUnitChange={(unit) =>
										updateArrayItemProperty(
											"textShadows",
											index,
											"blur",
											{
												number: textShadow.blur.number,
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

								{/* Spread */}
								<PropertyUnitInput
									label={t("spreadRadius")}
									layout="row"
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
												unit: textShadow.spread.unit,
											},
										)
									}
									unit={textShadow.spread.unit}
									value={textShadow.spread.number}
								/>
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
			<PropertyUnitInput
				label={t("opacity")}
				layout="row"
				onUnitChange={() => {
					// Opacity is always in %
				}}
				onValueChange={(opacity) =>
					updateNestedProperty("effects", (current) => ({
						...current,
						opacity,
					}))
				}
				unit="%"
				value={effects.opacity || 100}
			/>

			{/* Backdrop Filter */}
			<PropertySelect<BackdropFilter>
				label={t("backdropFilter")}
				layout="row"
				onChange={(backdropFilter) =>
					updateNestedProperty("effects", (current) => ({
						...current,
						backdropFilter: [backdropFilter],
					}))
				}
				options={backdropFilterOptions}
				value={effects.backdropFilter?.[0] || "none"}
			/>

			{/* Hover State Controls */}
			<div className="font-medium text-xs text-zinc-950 w-full">
				<p className="leading-[16px]">{t("hoverStateControls")}</p>
			</div>

			{/* Background Color */}
			<PropertyColorPicker
				label={t("backgroundColor")}
				layout="row"
				onChange={(backgroundColor) =>
					updateNestedProperty("effects", (current) => ({
						...current,
						hover: {
							...effects.hover,
							backgroundColor,
						},
					}))
				}
				value={effects.hover?.backgroundColor || "#171717"}
			/>

			{/* Text Color */}
			<PropertyColorPicker
				label={t("textColor")}
				layout="row"
				onChange={(textColor) =>
					updateNestedProperty("effects", (current) => ({
						...current,
						hover: {
							...effects.hover,
							textColor,
						},
					}))
				}
				value={effects.hover?.textColor || "#171717"}
			/>

			{/* Transitions Duration */}
			<PropertyUnitInput
				label={t("transitionsDuration")}
				layout="row"
				onUnitChange={(unit) =>
					updateNestedProperty("effects", (current) => ({
						...current,
						hover: {
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
						},
					}))
				}
				onValueChange={(number) =>
					updateNestedProperty("effects", (current) => ({
						...current,
						hover: {
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
						},
					}))
				}
				unit={effects.hover?.transition?.duration.unit || "ms"}
				value={effects.hover?.transition?.duration.number || 300}
			/>

			{/* Transitions Timing */}
			<PropertySelect<TimingFunction>
				label={t("transitionsTiming")}
				layout="row"
				onChange={(timingFunction) =>
					updateNestedProperty("effects", (current) => ({
						...current,
						hover: {
							...effects.hover,
							transition: {
								duration: effects.hover?.transition
									?.duration || {
									number: 300,
									unit: "ms",
								},
								timingFunction,
							},
						},
					}))
				}
				options={transitionTimingOptions}
				value={effects.hover?.transition?.timingFunction || "ease"}
			/>

			{/* Animations Type */}
			<PropertySelect<AnimationType>
				label={t("animationsType")}
				layout="row"
				onChange={(animationType) =>
					updateNestedProperty("effects", (current) => ({
						...current,
						animation: {
							duration: effects.animation?.duration || {
								number: 500,
								unit: "ms",
							},
							type: animationType,
						},
					}))
				}
				options={animationTypeOptions}
				value={effects.animation?.type || "none"}
			/>

			{/* Animations Duration */}
			<PropertyUnitInput
				label={t("animationsDuration")}
				layout="row"
				onUnitChange={(unit) =>
					updateNestedProperty("effects", (current) => ({
						...current,
						animation: {
							duration: {
								number:
									effects.animation?.duration.number || 500,
								unit,
							},
							type: effects.animation?.type || "none",
						},
					}))
				}
				onValueChange={(number) =>
					updateNestedProperty("effects", (current) => ({
						...current,
						animation: {
							duration: {
								number,
								unit: effects.animation?.duration.unit || "ms",
							},
							type: effects.animation?.type || "none",
						},
					}))
				}
				unit={effects.animation?.duration.unit || "ms"}
				value={effects.animation?.duration.number || 500}
			/>
		</div>
	);
}
