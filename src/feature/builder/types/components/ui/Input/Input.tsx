import { FormInputIcon as InputIcon } from "lucide-react";
import { InputBCI } from "./InputType";

export const InputBC: InputBCI = {
	groupId: "form",
	icon: <InputIcon size={16} />,
	id: "input",
	label: "Input",
	name: "Input",
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
} satisfies InputBCI;
