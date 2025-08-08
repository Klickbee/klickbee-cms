import { CheckSquare } from "lucide-react";
import { CheckboxBCDI } from "./CheckboxType";

export const CheckboxBC: CheckboxBCDI = {
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
} satisfies CheckboxBCDI;
