import z from "zod";

export const authPasswordResetRequestSchema = z.object({
	email: z.string().email().min(1),
});

export type UserPasswordResetRequestFormValues = z.infer<
	typeof authPasswordResetRequestSchema
>;
