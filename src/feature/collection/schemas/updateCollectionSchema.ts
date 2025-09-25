import { z } from "zod";

export const updateCollectionSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	slug: z.string().min(1, { message: "Slug is required" }),
});

export type UpdateCollectionFormValues = z.infer<typeof updateCollectionSchema>;
