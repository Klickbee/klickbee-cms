import { Mail } from "lucide-react";
import { EmailBCI } from "./EmailType";

export const EmailBC: EmailBCI = {
	groupId: "form",
	icon: <Mail size={16} />,
	id: "email",
	label: "Email",
	name: "Email",
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
} satisfies EmailBCI;
