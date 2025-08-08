import { Box } from "lucide-react";
import { DropdownBCDI } from "./DropdownType";

export const DropdownBC: DropdownBCDI = {
	groupId: "form",
	icon: <Box size={16} />,
	id: "dropdown",
	label: "Dropdown",
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
	type: "dropdown",
} satisfies DropdownBCDI;
