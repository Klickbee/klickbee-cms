import { z } from "zod";

export const authLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export type UserLoginFormValues = z.infer<typeof authLoginSchema>;
