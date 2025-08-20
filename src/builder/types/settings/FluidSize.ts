import { z } from "zod";

export const sizeUnits = ["px", "em", "rem"] as const;
export type SizeUnit = (typeof sizeUnits)[number];

/**
 * FluidSize represents a responsive size value that scales between minimum and maximum values
 * based on the viewport width. This enables fluid typography and spacing that adapts to different screen sizes.
 *
 * @property min - The minimum size value (used at smallest viewport)
 * @property max - The maximum size value (used at largest viewport)
 * @property sizeUnit - The unit for the size values (px, em, rem)
 * @property maxWidth - The viewport width at which the maximum size is reached
 * @property widthUnit - The unit for the maxWidth value (px, em, rem)
 */
export type FluidSize = {
	min: number;
	max: number;
	sizeUnit: SizeUnit;
	maxWidth: number;
};

/**
 * Zod schema for validating FluidSize objects
 */
export const fluidSizeSchema = z.object({
	max: z.number().min(0, "Maximum size must be a positive number"),
	maxWidth: z.number().positive("Max width must be a positive number"),
	min: z.number().min(0, "Minimum size must be a positive number"),
	sizeUnit: z.enum(sizeUnits, {
		errorMap: () => ({ message: "Size unit must be one of: px, em, rem" }),
	}),
	widthUnit: z
		.enum(sizeUnits, {
			errorMap: () => ({
				message: "Width unit must be one of: px, em, rem",
			}),
		})
		.optional(),
});
