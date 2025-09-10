import z from "zod";

export const aiSettingsSchema = z.object({
	aiApiKey: z.string(),
	aiModel: z.enum(["chatgpt", "mistral", "deepseek"]),
});

export type AiSettingsSchema = z.infer<typeof aiSettingsSchema>;

export const aiContextSchema = z.object({
	companyActivity: z.string().optional(),
	companyExperience: z.string().optional(),
	companyIndustry: z.string().optional(),
	companyName: z.string().optional(),
	otherInformations: z.string().optional(),
	toneOfVoice: z.string().optional(),
});

export type AiContextSchema = z.infer<typeof aiContextSchema>;
