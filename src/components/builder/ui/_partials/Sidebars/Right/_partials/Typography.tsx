"use client";

import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Ban,
	CaseLower,
	CaseSensitive,
	CaseUpper,
	IndentIncrease,
	Italic,
	List,
	ListOrdered,
	Strikethrough,
	Type,
	Underline,
	WrapText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useStyleState } from "@/builder/hooks/useStyleState";
import { TypographyStyle } from "@/builder/types/components/properties/componentStylePropsType";
import { SizeUnit } from "@/builder/types/settings/FluidSize";
import { TypographyFontWeight } from "@/builder/types/settings/TypographySettings";
import IconToggleGroup from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/IconToggleGroup";
import SimpleUnitInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/SimpleUnitInput";
import PropertyColumn from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyColumn";
import PropertyRow from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyRow";
import BasicColorPicker from "@/components/builder/ui/_partials/Sidebars/Right/_partials/pickers/BasicColorPicker";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function BuilderStyleTypography() {
	const t = useTranslations("Builder.RightSidebar.Typography");

	const { state: typography, updateProperty } =
		useStyleState<TypographyStyle>({
			color: "#171717",
			fontFamily: "Poppins",
			fontSize: { max: 16, maxWidth: 1440, min: 16, sizeUnit: "px" },
			fontStyle: "normal",
			fontWeight: "normal",
			letterSpacing: { number: 0, unit: "px" },
			lineHeight: { number: 1.5, unit: "em" },
			listStyle: "none",
			textAlign: "left",
			textDecoration: "none",
			textTransform: "unset",
			whiteSpace: "normal",
		});

	// Font Family options
	const fontFamilyOptions = [
		"Poppins",
		"Inter",
		"Arial",
		"Helvetica",
		"Times New Roman",
		"Georgia",
		"Verdana",
	];

	// Font Weight options
	const fontWeightOptions: { value: TypographyFontWeight; label: string }[] =
		[
			{ label: "Thin", value: "100" },
			{ label: "Extra Light", value: "200" },
			{ label: "Light", value: "300" },
			{ label: "Normal", value: "normal" },
			{ label: "Medium", value: "500" },
			{ label: "Semi Bold", value: "600" },
			{ label: "Bold", value: "bold" },
			{ label: "Extra Bold", value: "800" },
			{ label: "Black", value: "900" },
		];

	// Font Style options
	const fontStyleOptions = [
		{ icon: Type, value: "normal" as const },
		{ icon: Italic, value: "italic" as const },
	];

	// Text Transform options
	const textTransformOptions = [
		{ icon: Ban, value: "unset" as const },
		{ icon: CaseUpper, value: "uppercase" as const },
		{ icon: CaseLower, value: "lowercase" as const },
		{ icon: CaseSensitive, value: "capitalize" as const },
	];

	// Text Alignment options
	const textAlignmentOptions = [
		{ icon: AlignLeft, value: "left" as const },
		{ icon: AlignCenter, value: "center" as const },
		{ icon: AlignRight, value: "right" as const },
		{ icon: AlignJustify, value: "justify" as const },
	];

	// Text Decoration options
	const textDecorationOptions = [
		{ icon: Ban, value: "none" as const },
		{ icon: Underline, value: "underline" as const },
		{ icon: Strikethrough, value: "line-through" as const },
	];

	// White Space options
	const whiteSpaceOptions = [
		{ icon: Ban, value: "normal" as const },
		{ icon: WrapText, value: "nowrap" as const },
		{ icon: IndentIncrease, value: "pre-line" as const },
	];

	// List Style options
	const listStyleOptions = [
		{ icon: Ban, value: "none" as const },
		{ icon: List, value: "disc" as const },
		{ icon: ListOrdered, value: "circle" as const },
	];

	return (
		<div className="flex flex-col gap-3">
			{/* Font Family */}
			<PropertyColumn label={t("fontFamily")}>
				<Select
					onValueChange={(value) =>
						updateProperty("fontFamily", value)
					}
					value={typography.fontFamily || "Poppins"}
				>
					<SelectTrigger className="h-8 w-full text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{fontFamilyOptions.map((font) => (
							<SelectItem key={font} value={font}>
								{font}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</PropertyColumn>

			{/* Font Size */}
			<PropertyRow label={t("fontSize")}>
				<SimpleUnitInput
					onUnitChange={(unit) => {
						const currentValue = typography.fontSize || {
							max: 16,
							maxWidth: 1440,
							min: 16,
							sizeUnit: "px",
						};
						updateProperty("fontSize", {
							max: currentValue.max,
							maxWidth: currentValue.maxWidth,
							min: currentValue.min,
							sizeUnit: unit,
						});
					}}
					onValueChange={(number) => {
						const currentValue = typography.fontSize || {
							max: 16,
							maxWidth: 1440,
							min: 16,
							sizeUnit: "px",
						};
						updateProperty("fontSize", {
							max: number,
							maxWidth: currentValue.maxWidth,
							min: number,
							sizeUnit: currentValue.sizeUnit,
						});
					}}
					unit={typography.fontSize?.sizeUnit || "px"}
					value={typography.fontSize?.min || 16}
				/>
			</PropertyRow>

			{/* Font Weight */}
			<PropertyRow label={t("fontWeight")}>
				<Select
					onValueChange={(value: TypographyFontWeight) =>
						updateProperty("fontWeight", value)
					}
					value={typography.fontWeight || "normal"}
				>
					<SelectTrigger className="h-8 w-full text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{fontWeightOptions.map((weight) => (
							<SelectItem key={weight.value} value={weight.value}>
								{weight.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</PropertyRow>

			{/* Line Height */}
			<PropertyRow label={t("lineHeight")}>
				<SimpleUnitInput
					onUnitChange={(unit) => {
						const currentValue =
							typeof typography.lineHeight === "object"
								? typography.lineHeight
								: { number: 1.5, unit: "em" as SizeUnit };
						updateProperty("lineHeight", {
							number: currentValue.number,
							unit,
						});
					}}
					onValueChange={(number) => {
						const currentValue =
							typeof typography.lineHeight === "object"
								? typography.lineHeight
								: { number: 1.5, unit: "em" as SizeUnit };
						updateProperty("lineHeight", {
							number,
							unit: currentValue.unit,
						});
					}}
					unit={
						typeof typography.lineHeight === "object"
							? typography.lineHeight.unit
							: "em"
					}
					value={
						typeof typography.lineHeight === "object"
							? typography.lineHeight.number
							: 1.5
					}
				/>
			</PropertyRow>

			{/* Letter Spacing */}
			<PropertyRow label={t("letterSpacing")}>
				<SimpleUnitInput
					onUnitChange={(unit) => {
						const currentValue = typography.letterSpacing || {
							number: 0,
							unit: "px",
						};
						updateProperty("letterSpacing", {
							number: currentValue.number,
							unit,
						});
					}}
					onValueChange={(number) => {
						const currentValue = typography.letterSpacing || {
							number: 0,
							unit: "px",
						};
						updateProperty("letterSpacing", {
							number,
							unit: currentValue.unit,
						});
					}}
					unit={typography.letterSpacing?.unit || "px"}
					value={typography.letterSpacing?.number || 0}
				/>
			</PropertyRow>

			{/* Font Style */}
			<PropertyRow label={t("fontStyle")}>
				<IconToggleGroup
					onValueChange={(value) =>
						updateProperty("fontStyle", value)
					}
					options={fontStyleOptions}
					value={typography.fontStyle || "normal"}
				/>
			</PropertyRow>

			{/* Text Transform */}
			<PropertyColumn label={t("textTransform")}>
				<IconToggleGroup
					onValueChange={(value) =>
						updateProperty("textTransform", value)
					}
					options={textTransformOptions}
					value={typography.textTransform || "unset"}
				/>
			</PropertyColumn>

			{/* Text Color */}
			<PropertyRow label={t("textColor")}>
				<BasicColorPicker
					onChange={(color) => updateProperty("color", color)}
					value={typography.color || "#171717"}
				/>
			</PropertyRow>

			{/* Text Alignment */}
			<PropertyColumn label={t("textAlignment")}>
				<IconToggleGroup
					onValueChange={(value) =>
						updateProperty("textAlign", value)
					}
					options={textAlignmentOptions}
					value={typography.textAlign || "left"}
				/>
			</PropertyColumn>

			{/* Text Decoration */}
			<PropertyRow label={t("textDecoration")}>
				<IconToggleGroup
					onValueChange={(value) =>
						updateProperty("textDecoration", value)
					}
					options={textDecorationOptions}
					value={typography.textDecoration || "none"}
				/>
			</PropertyRow>

			{/* White Space */}
			<PropertyRow label={t("whiteSpace")}>
				<IconToggleGroup
					onValueChange={(value) =>
						updateProperty("whiteSpace", value)
					}
					options={whiteSpaceOptions}
					value={typography.whiteSpace || "normal"}
				/>
			</PropertyRow>

			{/* List Style */}
			<PropertyRow label={t("listStyle")}>
				<IconToggleGroup
					onValueChange={(value) =>
						updateProperty("listStyle", value)
					}
					options={listStyleOptions}
					value={typography.listStyle || "none"}
				/>
			</PropertyRow>
		</div>
	);
}
