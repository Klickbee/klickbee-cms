import { z } from "zod";

export const seoFormSchema = z.object({
	metaDescription: z
		.string()
		.max(160, "Meta Description should be under 160 characters"),
	metaTitle: z.string().max(60, "Meta Title should be under 60 characters"),
	slug: z.string().min(1, "URL is required"),
});

export type SeoFormValues = z.infer<typeof seoFormSchema>;
