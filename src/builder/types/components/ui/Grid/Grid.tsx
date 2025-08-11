import { LayoutGrid } from "lucide-react";
import { GridBCI } from "./GridType";

export const GridBC: GridBCI = {
	groupId: "layout",
	icon: <LayoutGrid size={16} />,
	id: "grid",
	label: "Grid/Column",
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
	type: "grid",
} satisfies GridBCI;
