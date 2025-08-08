import { Mail } from "lucide-react";
import { EmailBCDI } from "./EmailType";

export const EmailBC: EmailBCDI = {
	groupId: "form",
	icon: <Mail size={16} />,
	id: "email",
	label: "Email",
	props: {
		content: {
			name: "email",
			placeholder: "Enter email...",
			required: false,
		},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "email",
} satisfies EmailBCDI;
