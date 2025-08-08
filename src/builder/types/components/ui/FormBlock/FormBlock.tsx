import { Box } from "lucide-react";
import { FormBlockBCDI } from "./FormBlockType";

export const FormBlockBC: FormBlockBCDI = {
	groupId: "form",
	icon: <Box size={16} />,
	id: "formblock",
	label: "Form Block",
	props: {
		content: {},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
		},
	},
	type: "formblock",
} satisfies FormBlockBCDI;
