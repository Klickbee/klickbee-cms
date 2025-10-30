import { FormInput } from "lucide-react";
import { TextFieldBCI } from "./TextFieldType";

export const TextFieldBC: TextFieldBCI = {
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
} satisfies TextFieldBCI;
