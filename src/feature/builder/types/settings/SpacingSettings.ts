import { z } from "zod";
import {
	FluidSize,
	fluidSizeSchema,
} from "@/feature/builder/types/settings/FluidSize";

export type SectionPadding = {
	top: FluidSize;
	right: FluidSize;
	left: FluidSize;
	bottom: FluidSize;
	key: string /* To retrieve easily  */;
};
export type SectionGap = {
	row: FluidSize;
	column: FluidSize;
	key: string /* To retrieve easily  */;
};

export type SpacingSettings = {
	sectionPadding: SectionPadding[];
	gap: SectionGap[];
	maxWidth: number /* In pixels */;
};

export const sectionPaddingSchema = z.object({
	bottom: fluidSizeSchema,
	key: z.string().min(1, "Key is required"),
	left: fluidSizeSchema,
	right: fluidSizeSchema,
	top: fluidSizeSchema,
});

export const gapSchema = z.object({
	column: fluidSizeSchema,
	key: z.string().min(1, "Key is required"),
	row: fluidSizeSchema,
});

export const spacingSettingsSchema = z.object({
	gap: gapSchema.array(),
	maxWidth: z.number(),
	sectionPadding: sectionPaddingSchema.array(),
});

export const defaultSpacingSettings: SpacingSettings = {
	gap: [
		{
			column: { max: 1, maxWidth: 1440, min: 0.5, sizeUnit: "rem" },
			key: "default-gap",
			row: { max: 1, maxWidth: 1440, min: 0.5, sizeUnit: "rem" },
		},
	],
	maxWidth: 1440,
	sectionPadding: [
		{
			bottom: { max: 2, maxWidth: 1440, min: 1, sizeUnit: "rem" },
			key: "default-padding",
			left: { max: 2, maxWidth: 1440, min: 1, sizeUnit: "rem" },
			right: { max: 2, maxWidth: 1440, min: 1, sizeUnit: "rem" },
			top: { max: 2, maxWidth: 1440, min: 1, sizeUnit: "rem" },
		},
	],
};
