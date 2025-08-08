import { FormInput } from "lucide-react";
import { TextFieldBCDI } from "./TextFieldType";

export const TextFieldBC: TextFieldBCDI = {
	groupId: "form",
	icon: <FormInput size={16} />,
	id: "textfield",
	label: "Text Field",
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
	type: "textfield",
} satisfies TextFieldBCDI;
