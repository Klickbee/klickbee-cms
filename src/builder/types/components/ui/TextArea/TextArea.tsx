import { FormInput } from "lucide-react";
import { TextAreaBCI } from "./TextAreaType";

export const TextAreaBC: TextAreaBCI = {
	groupId: "form",
	icon: <FormInput size={16} />,
	id: "textarea",
	label: "Text Area",
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
	type: "text",
} satisfies TextAreaBCI;
