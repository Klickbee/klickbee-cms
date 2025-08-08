import { LayoutGrid } from "lucide-react";
import { GridBCDI } from "./GridType";

export const GridBC: GridBCDI = {
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
} satisfies GridBCDI;
