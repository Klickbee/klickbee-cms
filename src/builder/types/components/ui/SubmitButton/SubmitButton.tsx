import { Send } from "lucide-react";
import { SubmitButtonBCDI } from "./SubmitButtonType";

export const SubmitButtonBC: SubmitButtonBCDI = {
	groupId: "form",
	icon: <Send size={16} />,
	id: "submitbutton",
	label: "Submit Button",
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
} satisfies SubmitButtonBCDI;
