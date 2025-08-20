import { z } from "zod";

export const updateUserSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
