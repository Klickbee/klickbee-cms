import { FormInput } from "lucide-react";
import { TextAreaBCDI } from "./TextAreaType";

export const TextAreaBC: TextAreaBCDI = {
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
} satisfies TextAreaBCDI;
