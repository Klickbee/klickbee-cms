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
import PropertyColorPicker from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyColorPicker";
import PropertySelect from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";
import PropertyToggle from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyToggle";
import PropertyUnitInput from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyUnitInput";
import { STYLE_DEFAULTS } from "@/feature/builder/constants/styleDefaults";
import { useStyleProps } from "@/feature/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/feature/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { TypographyFontWeight } from "@/feature/builder/types/settings/TypographySettings";

export default function BuilderStyleTypography({
	component,
}: {
	component: BuilderComponent;
}) {
	const t = useTranslations("Builder.RightSidebar.Typography");

	const styleProps = useStyleProps(component, {
		typography: STYLE_DEFAULTS.TYPOGRAPHY,
	});
	const typography = styleProps.typography || STYLE_DEFAULTS.TYPOGRAPHY;
	const { updateNestedProperty } = useStyleUpdate(component);

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
			<PropertySelect<string>
				label={t("fontFamily")}
				layout="column"
				onChange={(value) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						fontFamily: value,
					}))
				}
				options={fontFamilyOptions.map((font) => ({
					label: font,
					value: font,
				}))}
				value={typography.fontFamily || "Poppins"}
			/>

			{/* Font Size */}
			<PropertyUnitInput
				label={t("fontSize")}
				layout="row"
				onUnitChange={(unit) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						fontSize: {
							...(typography.fontSize || {
								max: 16,
								maxWidth: 1440,
								min: 16,
								sizeUnit: "px",
							}),
							sizeUnit: unit,
						},
					}))
				}
				onValueChange={(number) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						fontSize: {
							...(typography.fontSize || {
								max: 16,
								maxWidth: 1440,
								min: 16,
								sizeUnit: "px",
							}),
							max: number,
							min: number,
						},
					}))
				}
				unit={typography.fontSize?.sizeUnit || "px"}
				value={typography.fontSize?.max || 16}
			/>

			{/* Font Weight */}
			<PropertySelect<TypographyFontWeight>
				label={t("fontWeight")}
				layout="row"
				onChange={(value) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						fontWeight: value,
					}))
				}
				options={fontWeightOptions}
				value={typography.fontWeight || "normal"}
			/>

			{/* Line Height */}
			<PropertyUnitInput
				label={t("lineHeight")}
				layout="row"
				onUnitChange={(unit) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						lineHeight: {
							number:
								typeof typography.lineHeight === "object"
									? typography.lineHeight.number
									: 1.5,
							unit,
						},
					}))
				}
				onValueChange={(number) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						lineHeight: {
							number,
							unit:
								typeof typography.lineHeight === "object"
									? typography.lineHeight.unit
									: "em",
						},
					}))
				}
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

			{/* Letter Spacing */}
			<PropertyUnitInput
				label={t("letterSpacing")}
				layout="row"
				onUnitChange={(unit) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						letterSpacing: {
							number: typography.letterSpacing?.number || 0,
							unit,
						},
					}))
				}
				onValueChange={(number) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						letterSpacing: {
							number,
							unit: typography.letterSpacing?.unit || "px",
						},
					}))
				}
				unit={typography.letterSpacing?.unit || "px"}
				value={typography.letterSpacing?.number || 0}
			/>

			{/* Font Style */}
			<PropertyToggle
				label={t("fontStyle")}
				layout="row"
				onChange={(value) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						fontStyle: value,
					}))
				}
				options={fontStyleOptions}
				value={typography.fontStyle || "normal"}
				variant="icon"
			/>

			{/* Text Transform */}
			<PropertyToggle
				label={t("textTransform")}
				layout="column"
				onChange={(value) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						textTransform: value,
					}))
				}
				options={textTransformOptions}
				value={typography.textTransform || "unset"}
				variant="icon"
			/>

			{/* Text Color */}
			<PropertyColorPicker
				label={t("textColor")}
				layout="row"
				onChange={(color) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						color,
					}))
				}
				value={typography.color || "#171717"}
			/>

			{/* Text Alignment */}
			<PropertyToggle
				label={t("textAlignment")}
				layout="column"
				onChange={(value) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						textAlign: value,
					}))
				}
				options={textAlignmentOptions}
				value={typography.textAlign || "left"}
				variant="icon"
			/>

			{/* Text Decoration */}
			<PropertyToggle
				label={t("textDecoration")}
				layout="row"
				onChange={(value) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						textDecoration: value,
					}))
				}
				options={textDecorationOptions}
				value={typography.textDecoration || "none"}
				variant="icon"
			/>

			{/* White Space */}
			<PropertyToggle
				label={t("whiteSpace")}
				layout="row"
				onChange={(value) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						whiteSpace: value,
					}))
				}
				options={whiteSpaceOptions}
				value={typography.whiteSpace || "normal"}
				variant="icon"
			/>

			{/* List Style */}
			<PropertyToggle
				label={t("listStyle")}
				layout="row"
				onChange={(value) =>
					updateNestedProperty("typography", (current) => ({
						...current,
						listStyle: value,
					}))
				}
				options={listStyleOptions}
				value={typography.listStyle || "none"}
				variant="icon"
			/>
		</div>
	);
}
