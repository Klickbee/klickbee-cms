import { LayoutGrid } from "lucide-react";
import { GridBCI } from "./GridType";

export const GridBC: GridBCI = {
	groupId: "layout",
	icon: <LayoutGrid size={16} />,
	id: "Grid",
	label: "Grid/Column",
	name: "Grid",
	props: {
		content: {},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			layout: { grid: { columns: 2 } },
			sizeAndSpacing: {},
		},
	},
	type: "grid",
} satisfies GridBCI;
