import z from "zod";

export const authPasswordResetSchema = z
	.object({
		confirmNewPassword: z.string().min(8),
		newPassword: z.string().min(8),
		token: z.string().min(1),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		path: ["confirmNewPassword"],
	});

export type UserPasswordResetFormValues = z.infer<
	typeof authPasswordResetSchema
>;
