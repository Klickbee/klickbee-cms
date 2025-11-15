import { Box } from "lucide-react";
import { DropdownBCI } from "./DropdownType";

export const DropdownBC: DropdownBCI = {
	groupId: "form",
	icon: <Box size={16} />,
	id: "dropdown",
	label: "Dropdown",
	name: "Dropdown",
	props: {
		content: {
			options: [],
			name: "",
			defaultText: "",
		},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},

			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "dropdown",
} satisfies DropdownBCI;
