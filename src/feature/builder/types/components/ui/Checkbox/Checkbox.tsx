import { CheckSquare } from "lucide-react";
import { CheckboxBCI } from "./CheckboxType";

export const CheckboxBC: CheckboxBCI = {
	groupId: "form",
	icon: <CheckSquare size={16} />,
	id: "checkbox",
	label: "Checkbox",
	props: {
		content: {},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "checkbox",
} satisfies CheckboxBCI;
