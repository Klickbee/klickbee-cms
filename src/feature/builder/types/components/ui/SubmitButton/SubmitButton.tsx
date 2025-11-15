import { Send } from "lucide-react";
import { SubmitButtonBCI } from "./SubmitButtonType";

export const SubmitButtonBC: SubmitButtonBCI = {
	groupId: "form",
	icon: <Send size={16} />,
	id: "submitbutton",
	label: "Submit Button",
	name: "SubmitButton",
	props: {
		content: {},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},

			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "submitbutton",
} satisfies SubmitButtonBCI;
