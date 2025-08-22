"use client";

import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Ban,
	Bold,
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
import { useState } from "react";
import {
	ListStyle,
	TextAlign,
	TextDecoration,
	WhiteSpace,
} from "@/builder/types/components/properties/componentStylePropsType";
import { SizeUnit } from "@/builder/types/settings/FluidSize";
import {
	TypographyFontWeight,
	TypographyTextTransform,
} from "@/builder/types/settings/TypographySettings";
import ColorPicker from "@/components/builder/ui/ColorPicker";
import IconToggleGroup from "@/components/builder/ui/IconToggleGroup";
import PropertyColumn from "@/components/builder/ui/PropertyColumn";
import PropertyRow from "@/components/builder/ui/PropertyRow";
import SimpleUnitInput from "@/components/builder/ui/SimpleUnitInput";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type FontStyleType = "normal" | "bold" | "italic";

export default function BuilderStyleTypography() {
	const t = useTranslations("Builder.RightSidebar.Typography");

	// Font states
	const [fontFamily, setFontFamily] = useState<string>("Poppins");
	const [fontSize, setFontSize] = useState<number>(100);
	const [fontSizeUnit, setFontSizeUnit] = useState<SizeUnit>("px");
	const [fontWeight, setFontWeight] =
		useState<TypographyFontWeight>("normal");

	// Line Height states
	const [lineHeight, setLineHeight] = useState<number>(120);
	const [lineHeightUnit, setLineHeightUnit] = useState<SizeUnit>("px");

	// Letter Spacing states
	const [letterSpacing, setLetterSpacing] = useState<number>(120);
	const [letterSpacingUnit, setLetterSpacingUnit] = useState<SizeUnit>("px");

	// Font Style states
	const [fontStyle, setFontStyle] = useState<FontStyleType>("normal");

	// Text Transform states
	const [textTransform, setTextTransform] =
		useState<TypographyTextTransform>("unset");

	// Text Color state
	const [textColor, setTextColor] = useState<string>("#171717");

	// Text Alignment state
	const [textAlignment, setTextAlignment] = useState<TextAlign>("left");

	// Text Decoration state
	const [textDecoration, setTextDecoration] =
		useState<TextDecoration>("none");

	// White Space state
	const [whiteSpace, setWhiteSpace] = useState<WhiteSpace>("normal");

	// List Style state
	const [listStyle, setListStyle] = useState<ListStyle>("none");

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
		{ icon: Bold, value: "bold" as const },
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
				<Select onValueChange={setFontFamily} value={fontFamily}>
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
					onUnitChange={setFontSizeUnit}
					onValueChange={setFontSize}
					unit={fontSizeUnit}
					value={fontSize}
				/>
			</PropertyRow>

			{/* Font Weight */}
			<PropertyRow label={t("fontWeight")}>
				<Select
					onValueChange={(value: TypographyFontWeight) =>
						setFontWeight(value)
					}
					value={fontWeight}
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
					onUnitChange={setLineHeightUnit}
					onValueChange={setLineHeight}
					unit={lineHeightUnit}
					value={lineHeight}
				/>
			</PropertyRow>

			{/* Letter Spacing */}
			<PropertyRow label={t("letterSpacing")}>
				<SimpleUnitInput
					onUnitChange={setLetterSpacingUnit}
					onValueChange={setLetterSpacing}
					unit={letterSpacingUnit}
					value={letterSpacing}
				/>
			</PropertyRow>

			{/* Font Style */}
			<PropertyRow label={t("fontStyle")}>
				<IconToggleGroup
					onValueChange={setFontStyle}
					options={fontStyleOptions}
					value={fontStyle}
				/>
			</PropertyRow>

			{/* Text Transform */}
			<PropertyColumn label={t("textTransform")}>
				<IconToggleGroup
					onValueChange={setTextTransform}
					options={textTransformOptions}
					value={textTransform}
				/>
			</PropertyColumn>

			{/* Text Color */}
			<PropertyRow label={t("textColor")}>
				<ColorPicker onChange={setTextColor} value={textColor} />
			</PropertyRow>

			{/* Text Alignment */}
			<PropertyColumn label={t("textAlignment")}>
				<IconToggleGroup
					onValueChange={setTextAlignment}
					options={textAlignmentOptions}
					value={textAlignment}
				/>
			</PropertyColumn>

			{/* Text Decoration */}
			<PropertyRow label={t("textDecoration")}>
				<IconToggleGroup
					onValueChange={setTextDecoration}
					options={textDecorationOptions}
					value={textDecoration}
				/>
			</PropertyRow>

			{/* White Space */}
			<PropertyRow label={t("whiteSpace")}>
				<IconToggleGroup
					onValueChange={setWhiteSpace}
					options={whiteSpaceOptions}
					value={whiteSpace}
				/>
			</PropertyRow>

			{/* List Style */}
			<PropertyRow label={t("listStyle")}>
				<IconToggleGroup
					onValueChange={setListStyle}
					options={listStyleOptions}
					value={listStyle}
				/>
			</PropertyRow>
		</div>
	);
}
