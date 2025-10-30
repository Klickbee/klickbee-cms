import { z } from "zod";

export const colorTypes = ["primary", "secondary", "accent", "unique"] as const;
export type ColorType = (typeof colorTypes)[number];

export type ColorSettings = {
	hexCode: string;
	name: string;
	type: ColorType;
};

export const colorSchema = z.object({
	hexCode: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Hex invalide"),
	name: z.string(),
	type: z.enum(colorTypes),
});

export const defaultColorSettings = [
	{
		hexCode: "#000000",
		name: "Default Color",
		type: "primary" as ColorType,
	},
	{
		hexCode: "#FFFFFF",
		name: "White",
		type: "secondary" as ColorType,
	},
	{
		hexCode: "#FF5733",
		name: "Accent Color",
		type: "accent" as ColorType,
	},
	{
		hexCode: "#123456",
		name: "Unique Color",
		type: "unique" as ColorType,
	},
];
