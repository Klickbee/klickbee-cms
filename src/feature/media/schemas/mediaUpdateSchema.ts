import { z } from "zod";

export const mediaUpdateSchema = z.object({
	altText: z.string().optional(),
	caption: z.string().optional(),
	description: z.string().optional(),
});

export type MediaUpdateSchema = z.infer<typeof mediaUpdateSchema>;
