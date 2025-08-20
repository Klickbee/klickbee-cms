import { z } from "zod";

export const createUserSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1, { message: "Name is required" }),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
