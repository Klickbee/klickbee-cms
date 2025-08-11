import { Box } from "lucide-react";
import { FormBlockBCI } from "./FormBlockType";

export const FormBlockBC: FormBlockBCI = {
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
} satisfies FormBlockBCI;
