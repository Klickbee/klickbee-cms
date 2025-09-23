import { z } from "zod";

export const contactInformationsSchema = z.object({
	contactEmail: z.string().email({ message: "InvalidEmail" }),
	contactPhone: z.string().optional(),
});

export type ContactInformationFormValues = z.infer<
	typeof contactInformationsSchema
>;

export const contactNotificationSchema = z.object({
	emailRecipient: z.string().email({ message: "InvalidEmail" }),
	enableSubmissionConfirmation: z.boolean(),
});

export type ContactNotificationFormValues = z.infer<
	typeof contactNotificationSchema
>;
