import { ListIcon } from "lucide-react";
import { ListBCDI } from "./ListType";

export const ListBC: ListBCDI = {
	groupId: "text",
	icon: <ListIcon size={16} />,
	id: "list",
	label: "List",
	props: {
		content: {
			items: ["Item 1"],
			listType: "bulleted",
		},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},

			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "list",
} satisfies ListBCDI;
