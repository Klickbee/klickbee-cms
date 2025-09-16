import z from "zod";

export const aiSettingsSchema = z.object({
	aiApiKey: z.string(),
	aiModel: z.enum(["chatgpt", "mistral", "deepseek"]),
});

export type AiSettingsSchema = z.infer<typeof aiSettingsSchema>;

export const aiContextSchema = z.object({
	companyActivity: z.string().min(1, { message: "CompanyActivityRequired" }),
	companyExperience: z
		.string()
		.min(1, { message: "CompanyExperienceRequired" }),
	companyIndustry: z.string().min(1, { message: "CompanyIndustryRequired" }),
	companyName: z.string().min(1, { message: "CompanyNameRequired" }),
	otherInformations: z.string().optional(),
	toneOfVoice: z.string().optional(),
});

export type AiContextSchema = z.infer<typeof aiContextSchema>;
