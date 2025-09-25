import { z } from "zod";

export const createCollectionItemSchema = z
	.object({
		author: z.string().min(1, { message: "Author is required" }),
		collectionSlug: z.string({ message: "Collection slug is required" }),
		// parse content as JSON to ensure it's valid JSON
		content: z.string().refine(
			(val) => {
				try {
					JSON.parse(val);
					return true;
				} catch {
					return false;
				}
			},
			{ message: "Content must be valid JSON" },
		),
		isPublished: z.boolean().optional().default(false),
		metaDescription: z.string().optional(),
		metaKeywords: z.string().optional(),
		metaTitle: z.string().optional(),
		publishDate: z.string().optional(),
		publishedAt: z.date().optional(),
		slug: z.string().min(1, { message: "Slug is required" }),
		title: z.string().min(1, { message: "Title is required" }),
	})
	.superRefine((data, ctx) => {
		if (data.publishDate) {
			const date = new Date(data.publishDate);
			if (isNaN(date.getTime())) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Publish date must be a valid date string",
				});
			} else {
				data.publishedAt = date;
			}
		}
	});

export type CreateCollectionItemFormValues = z.infer<
	typeof createCollectionItemSchema
>;
