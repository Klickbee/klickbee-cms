import { z } from "zod";
import {
	FluidSize,
	fluidSizeSchema,
	SizeUnit,
	sizeUnits,
} from "@/builder/types/settings/FluidSize";

/**
 * Valid font style values for typography settings
 * Includes both font-style and text-transform CSS properties
 */
export const typographyFontStyles = ["normal", "italic", "oblique"] as const;
export type TypographyFontStyle = (typeof typographyFontStyles)[number];

/**
 * Valid font weight values for typography settings
 * Includes both numeric and named weights
 */
export const typographyFontWeights = [
	"100",
	"200",
	"300",
	"400",
	"500",
	"600",
	"700",
	"800",
	"900",
	"normal",
	"bold",
	"bolder",
] as const;

export type TypographyFontWeight = (typeof typographyFontWeights)[number];

/**
 * Valid text transform values for typography settings
 * Used to control text casing and capitalization
 */

export const typographyTextTransforms = [
	"uppercase",
	"lowercase",
	"capitalize",
	"unset",
] as const;

export type TypographyTextTransform = (typeof typographyTextTransforms)[number];

/**
 * Typography settings for a specific text style
 *
 * @property key - Unique identifier for this typography style
 * @property fontFamily - Font family name (e.g., "Inter", "Poppins")
 * @property fontSize - Fluid size configuration for font size
 * @property lineHeight - Line height value
 * @property lineHeightUnits - Unit for line height (px, em, rem)
 * @property fontWeight - Font weight (100-900, normal, bold, bolder)
 * @property fontStyle - Font style (normal, italic, oblique) or text transform (uppercase, lowercase, capitalize)
 * @property letterSpacing - Letter spacing value
 * @property letterSpacingUnits - Unit for letter spacing (px, em, rem)
 * @property textTransform - Text transform for additional styling (uppercase, lowercase, capitalize, unset)
 */
export type TypographySettings = {
	key: string;
	fontFamily: string;
	fontSize: FluidSize;
	lineHeight: number;
	lineHeightUnits: SizeUnit;
	fontWeight: TypographyFontWeight;
	fontStyle: TypographyFontStyle;
	letterSpacing: number;
	letterSpacingUnits: SizeUnit;
	textTransform: TypographyTextTransform; // Text transform for additional styling
};

/**
 * Collection of typography settings with responsive configuration
 *
 * @property maxWidth - Maximum viewport width for responsive scaling
 * @property widthUnit - Unit for maxWidth (px, em, rem)
 * @property typographies - Array of typography settings
 */
export type FluidTypographySettings = {
	typographies: TypographySettings[];
	maxWidth: number;
};

/**
 * Zod schema for validating typography settings
 */
export const typographySettingsSchema = z.object({
	fontFamily: z.string().min(1, "Font family is required"),
	fontSize: fluidSizeSchema,
	fontStyle: z.enum(typographyFontStyles, {
		errorMap: () => ({ message: "Invalid font style" }),
	}),
	fontWeight: z.enum(typographyFontWeights, {
		errorMap: () => ({ message: "Invalid font weight" }),
	}),
	key: z.string().min(1, "Typography key is required"),
	letterSpacing: z.number(),
	letterSpacingUnits: z.enum(sizeUnits, {
		errorMap: () => ({
			message: "Letter spacing unit must be one of: px, em, rem",
		}),
	}),
	lineHeight: z.number().positive("Line height must be a positive number"),
	lineHeightUnits: z.enum(sizeUnits, {
		errorMap: () => ({
			message: "Line height unit must be one of: px, em, rem",
		}),
	}),
	textTransform: z
		.enum(typographyTextTransforms)
		.describe("Optional text transform for additional styling"),
});

/**
 * Zod schema for validating fluid typography settings
 */
export const fluidTypographySettingsSchema = z.object({
	maxWidth: z.number().positive("Max width must be a positive number"),
	typographies: z
		.array(typographySettingsSchema)
		.min(1, "At least one typography style is required"),
});

/**
 * Default fluid typography settings with comprehensive presets
 * Includes styles for headings (h1-h3), body text, buttons, captions, and links
 */
export const defaultFluidTypographySettings: FluidTypographySettings = {
	maxWidth: 1440,
	typographies: [
		// Headings
		{
			fontFamily: "Inter",
			fontSize: { max: 3.5, maxWidth: 1440, min: 2.5, sizeUnit: "rem" },
			fontStyle: "normal",
			fontWeight: "700",
			key: "Heading 1",
			letterSpacing: -0.5,
			letterSpacingUnits: "px",
			lineHeight: 1.2,
			lineHeightUnits: "em",
			textTransform: "uppercase",
		},
		{
			fontFamily: "Inter",
			fontSize: { max: 3, maxWidth: 1440, min: 2, sizeUnit: "rem" },
			fontStyle: "normal",
			fontWeight: "600",
			key: "Heading 2",
			letterSpacing: -0.25,
			letterSpacingUnits: "px",
			lineHeight: 1.3,
			lineHeightUnits: "em",
			textTransform: "uppercase",
		},
		{
			fontFamily: "Inter",
			fontSize: { max: 2, maxWidth: 1440, min: 1.5, sizeUnit: "rem" },
			fontStyle: "normal",
			fontWeight: "600",
			key: "Heading 3",
			letterSpacing: 0,
			letterSpacingUnits: "px",
			lineHeight: 1.4,
			lineHeightUnits: "em",
			textTransform: "capitalize",
		},

		// Body text
		{
			fontFamily: "Poppins",
			fontSize: {
				max: 1.25,
				maxWidth: 1440,
				min: 1.125,
				sizeUnit: "rem",
			},
			fontStyle: "normal",
			fontWeight: "400",
			key: "Body Large",
			letterSpacing: 0,
			letterSpacingUnits: "px",
			lineHeight: 1.6,
			lineHeightUnits: "em",
			textTransform: "unset",
		},
		{
			fontFamily: "Poppins",
			fontSize: { max: 1.125, maxWidth: 1440, min: 1, sizeUnit: "rem" },
			fontStyle: "normal",
			fontWeight: "400",
			key: "Body",
			letterSpacing: 0,
			letterSpacingUnits: "px",
			lineHeight: 1.6,
			lineHeightUnits: "em",
			textTransform: "unset",
		},
		{
			fontFamily: "Poppins",
			fontSize: { max: 1, maxWidth: 1440, min: 0.875, sizeUnit: "rem" },
			fontStyle: "normal",
			fontWeight: "400",
			key: "Body Small",
			letterSpacing: 0.1,
			letterSpacingUnits: "px",
			lineHeight: 1.5,
			lineHeightUnits: "em",
			textTransform: "lowercase",
		},

		// UI elements
		{
			fontFamily: "Inter",
			fontSize: { max: 1, maxWidth: 1440, min: 0.875, sizeUnit: "rem" },
			fontStyle: "normal",
			fontWeight: "500",
			key: "Button",
			letterSpacing: 0.5,
			letterSpacingUnits: "px",
			lineHeight: 1.5,
			lineHeightUnits: "em",
			textTransform: "unset",
		},
		{
			fontFamily: "Poppins",
			fontSize: {
				max: 0.875,
				maxWidth: 1440,
				min: 0.75,
				sizeUnit: "rem",
			},
			fontStyle: "italic",
			fontWeight: "400",
			key: "Caption",
			letterSpacing: 0.25,
			letterSpacingUnits: "px",
			lineHeight: 1.4,
			lineHeightUnits: "em",
			textTransform: "lowercase",
		},
		{
			fontFamily: "Poppins",
			fontSize: { max: 1.125, maxWidth: 1440, min: 1, sizeUnit: "rem" },
			fontStyle: "normal",
			fontWeight: "500",
			key: "Link",
			letterSpacing: 0,
			letterSpacingUnits: "px",
			lineHeight: 1.6,
			lineHeightUnits: "em",
			textTransform: "unset",
		},
	],
};
