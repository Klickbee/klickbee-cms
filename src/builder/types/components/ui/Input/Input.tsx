import { FormInputIcon as InputIcon } from "lucide-react";
import { InputBCDI } from "./InputType";

export const InputBC: InputBCDI = {
	groupId: "form",
	icon: <InputIcon size={16} />,
	id: "input",
	label: "Input",
	props: {
		content: {
			name: "input",
			placeholder: "Enter text...",
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
	type: "input",
} satisfies InputBCDI;
