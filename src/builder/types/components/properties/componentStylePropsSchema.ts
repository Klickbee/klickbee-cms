import { z } from "zod";
import { colorSchema } from "@/builder/types/settings/ColorSettings";
import { sizeUnits } from "@/builder/types/settings/FluidSize";
import {
	gapSchema as sectionGapSchema,
	sectionPaddingSchema,
} from "@/builder/types/settings/SpacingSettings";
import { typographySettingsSchema } from "@/builder/types/settings/TypographySettings";

/**
 * Zod schemas for component style properties
 * These schemas are used for validation of component style props
 */

// Display type schema
export const displayTypeSchema = z.enum([
	"block",
	"inline",
	"flex",
	"grid",
	"inline-flex",
	"inline-grid",
]);
export type DisplayType = z.infer<typeof displayTypeSchema>;

// Position type schema
export const positionTypeSchema = z.enum([
	"static",
	"relative",
	"absolute",
	"fixed",
	"sticky",
]);
export type PositionType = z.infer<typeof positionTypeSchema>;

// Overflow type schema
export const overflowTypeSchema = z.enum([
	"visible",
	"hidden",
	"scroll",
	"auto",
]);
export type OverflowType = z.infer<typeof overflowTypeSchema>;

// Object fit type schema
export const objectFitTypeSchema = z.enum(["cover", "contain", "fill", "none"]);
export type ObjectFitType = z.infer<typeof objectFitTypeSchema>;

// Justify content schema
export const justifyContentSchema = z.enum([
	"start",
	"center",
	"end",
	"space-between",
	"space-around",
	"space-evenly",
]);
export type JustifyContent = z.infer<typeof justifyContentSchema>;

// Align items schema
export const alignItemsSchema = z.enum(["start", "center", "end", "stretch"]);
export type AlignItems = z.infer<typeof alignItemsSchema>;

// Align content schema
export const alignContentSchema = z.enum([
	"start",
	"center",
	"end",
	"stretch",
	"space-between",
	"space-around",
	"space-evenly",
]);
export type AlignContent = z.infer<typeof alignContentSchema>;

// Justify items schema (for grid)
export const justifyItemsSchema = z.enum(["start", "center", "end", "stretch"]);
export type JustifyItems = z.infer<typeof justifyItemsSchema>;

// Flex direction schema
export const flexDirectionSchema = z.enum(["row", "column"]);
export type FlexDirection = z.infer<typeof flexDirectionSchema>;

// Flex wrap schema
export const flexWrapSchema = z.enum(["wrap", "nowrap"]);
export type FlexWrap = z.infer<typeof flexWrapSchema>;

// Grid auto schema
export const gridAutoSchema = z.union([
	z.number(),
	z.string().regex(/^\d+fr$/, "Must be in format '1fr', '2fr', etc."),
]);
export type GridAuto = z.infer<typeof gridAutoSchema>;

// Grid auto flow schema
export const gridAutoFlowSchema = z.enum(["row", "column", "dense"]);
export type GridAutoFlow = z.infer<typeof gridAutoFlowSchema>;

// Side schema
export const sideSchema = z.enum(["top", "right", "bottom", "left"]);
export type Side = z.infer<typeof sideSchema>;

// Text align schema
export const textAlignSchema = z.enum(["left", "center", "right", "justify"]);
export type TextAlign = z.infer<typeof textAlignSchema>;

// Text transform schema
export const textTransformSchema = z.enum([
	"none",
	"uppercase",
	"lowercase",
	"capitalize",
]);
export type TextTransform = z.infer<typeof textTransformSchema>;

// Text decoration schema
export const textDecorationSchema = z.enum([
	"none",
	"underline",
	"line-through",
]);
export type TextDecoration = z.infer<typeof textDecorationSchema>;

// White space schema
export const whiteSpaceSchema = z.enum(["normal", "nowrap", "pre-line"]);
export type WhiteSpace = z.infer<typeof whiteSpaceSchema>;

// List style schema
export const listStyleSchema = z.enum(["disc", "circle", "none"]);
export type ListStyle = z.infer<typeof listStyleSchema>;

// Gradient type schema
export const gradientTypeSchema = z.enum(["linear", "radial"]);
export type GradientType = z.infer<typeof gradientTypeSchema>;

// Image size schema
export const imageSizeSchema = z.enum(["cover", "contain", "auto"]);
export type ImageSize = z.infer<typeof imageSizeSchema>;

// Image position schema
export const imagePositionSchema = z.enum([
	"top",
	"center",
	"bottom",
	"custom",
]);
export type ImagePosition = z.infer<typeof imagePositionSchema>;

// Image repeat schema
export const imageRepeatSchema = z.enum(["repeat", "no-repeat"]);
export type ImageRepeat = z.infer<typeof imageRepeatSchema>;

// Background attachment schema
export const backgroundAttachmentSchema = z.enum(["scroll", "fixed"]);
export type BackgroundAttachment = z.infer<typeof backgroundAttachmentSchema>;

// Border style schema
export const borderStyleSchema = z.enum([
	"solid",
	"dashed",
	"dotted",
	"double",
]);
export type BorderStyle = z.infer<typeof borderStyleSchema>;

// Backdrop filter schema
export const backdropFilterSchema = z.enum(["blur", "brightness", "contrast"]);
export type BackdropFilter = z.infer<typeof backdropFilterSchema>;

// Timing function schema
export const timingFunctionSchema = z.enum(["ease", "linear"]);
export type TimingFunction = z.infer<typeof timingFunctionSchema>;

// Animation type schema
export const animationTypeSchema = z.enum(["fade", "slide", "bounce"]);
export type AnimationType = z.infer<typeof animationTypeSchema>;

// Spacing value schema
export const spacingValueSchema = z.object({
	number: z.number(),
	unit: z.enum(sizeUnits),
});
export type SpacingValue = z.infer<typeof spacingValueSchema>;

// Layout style schema
export const layoutStyleSchema = z
	.object({
		bottom: spacingValueSchema.optional(),
		display: displayTypeSchema.optional(),
		flex: z
			.object({
				alignContent: alignContentSchema.optional(),
				alignItems: alignItemsSchema.optional(),
				direction: flexDirectionSchema.optional(),
				gap: sectionGapSchema.optional(),
				grow: z.number().optional(),
				justifyContent: justifyContentSchema.optional(),
				shrink: z.number().optional(),
				wrap: flexWrapSchema.optional(),
			})
			.optional(),
		grid: z
			.object({
				alignContent: alignContentSchema.optional(),
				alignItems: alignItemsSchema.optional(),
				autoColumns: gridAutoSchema.optional(),
				autoFlow: gridAutoFlowSchema.optional(),
				autoRows: gridAutoSchema.optional(),
				columns: gridAutoSchema.optional(),
				gap: sectionGapSchema.optional(),
				justifyContent: justifyContentSchema.optional(),
				justifyItems: justifyItemsSchema.optional(),
				rows: gridAutoSchema.optional(),
			})
			.optional(),
		left: spacingValueSchema.optional(),
		objectFit: objectFitTypeSchema.optional(),
		overflow: overflowTypeSchema.optional(),
		position: positionTypeSchema.optional(),
		right: spacingValueSchema.optional(),
		top: spacingValueSchema.optional(),
		zIndex: z.number().optional(),
	})
	.optional();
export type LayoutStyle = z.infer<typeof layoutStyleSchema>;

// Size and spacing style schema
export const sizeSpacingStyleSchema = z
	.object({
		height: spacingValueSchema.optional(),
		margin: sectionPaddingSchema.optional(),
		maxHeight: spacingValueSchema.optional(),
		maxWidth: spacingValueSchema.optional(),
		minHeight: spacingValueSchema.optional(),
		minWidth: spacingValueSchema.optional(),
		padding: sectionPaddingSchema.optional(),
		width: spacingValueSchema.optional(),
	})
	.optional();
export type SizeSpacingStyle = z.infer<typeof sizeSpacingStyleSchema>;

// Typography style schema
export const typographyStyleSchema = z
	.object({
		color: colorSchema.optional(),
		font: typographySettingsSchema.optional(),
		fontFamily: z.string().optional(),
		fontSize: z.number().optional(),
		fontStyle: z.string().optional(),
		fontWeight: z.number().optional(),
		letterSpacing: z.number().optional(),
		lineHeight: z
			.union([
				spacingValueSchema,
				z.enum(["normal", "inherit", "initial", "unset"]),
			])
			.optional(),
		listStyle: listStyleSchema.optional(),
		textAlign: textAlignSchema.optional(),
		textDecoration: textDecorationSchema.optional(),
		textTransform: textTransformSchema.optional(),
		whiteSpace: whiteSpaceSchema.optional(),
	})
	.optional();
export type TypographyStyle = z.infer<typeof typographyStyleSchema>;

// Background style schema
export const backgroundStyleSchema = z
	.object({
		color: colorSchema.optional(),
		gradient: z
			.object({
				angle: z
					.object({
						number: z.number(),
						unit: z.enum(["deg", "rad"]),
					})
					.optional(),
				colors: z.tuple([colorSchema, colorSchema]),
				type: gradientTypeSchema,
			})
			.optional(),
		image: z
			.object({
				attachment: backgroundAttachmentSchema.optional(),
				position: z
					.union([
						imagePositionSchema,
						z.object({
							x: spacingValueSchema,
							y: spacingValueSchema,
						}),
					])
					.optional(),
				repeat: imageRepeatSchema.optional(),
				size: imageSizeSchema.optional(),
				src: z.string(),
			})
			.optional(),
	})
	.optional();
export type BackgroundStyle = z.infer<typeof backgroundStyleSchema>;

// Border and corner style schema
export const borderCornerStyleSchema = z
	.object({
		borderColor: colorSchema.optional(),
		borderRadius: z.record(sideSchema, spacingValueSchema).optional(),
		borderStyle: borderStyleSchema.optional(),
		borderWidth: z.record(sideSchema, spacingValueSchema).optional(),
		outlineColor: colorSchema.optional(),
		outlineWidth: spacingValueSchema.optional(),
	})
	.optional();
export type BorderCornerStyle = z.infer<typeof borderCornerStyleSchema>;

// Effects style schema
export const effectsStyleSchema = z
	.object({
		animation: z
			.object({
				duration: z.object({
					number: z.number(),
					unit: z.enum(["ms", "s"]),
				}),
				type: animationTypeSchema,
			})
			.optional(),
		backdropFilter: z.array(backdropFilterSchema).optional(),
		boxShadow: z
			.object({
				blur: z.object({
					number: z.number(),
					unit: z.enum(sizeUnits),
				}),
				color: colorSchema,
				spread: z.object({
					number: z.number(),
					unit: z.enum(sizeUnits),
				}),
				x: z.object({
					number: z.number(),
					unit: z.enum(sizeUnits),
				}),
				y: z.object({
					number: z.number(),
					unit: z.enum(sizeUnits),
				}),
			})
			.optional(),
		hover: z
			.object({
				backgroundColor: colorSchema.optional(),
				boxShadow: z.boolean().optional(),
				scale: z.number().optional(),
				transition: z
					.object({
						duration: z.object({
							number: z.number(),
							unit: z.enum(["ms", "s"]),
						}),
						timingFunction: timingFunctionSchema,
					})
					.optional(),
			})
			.optional(),
		opacity: z.number().min(0).max(1).optional(),
		textShadow: z
			.object({
				blur: z.object({
					number: z.number(),
					unit: z.enum(sizeUnits),
				}),
				color: colorSchema,
				x: z.object({
					number: z.number(),
					unit: z.enum(sizeUnits),
				}),
				y: z.object({
					number: z.number(),
					unit: z.enum(sizeUnits),
				}),
			})
			.optional(),
	})
	.optional();
export type EffectsStyle = z.infer<typeof effectsStyleSchema>;

// Component style props schema
export const componentStylePropsSchema = z.object({
	background: backgroundStyleSchema,
	bordersAndCorners: borderCornerStyleSchema,
	effects: effectsStyleSchema,
	layout: layoutStyleSchema,
	sizeAndSpacing: sizeSpacingStyleSchema,
	typography: typographyStyleSchema,
});
export type ComponentStyleProps = z.infer<typeof componentStylePropsSchema>;
