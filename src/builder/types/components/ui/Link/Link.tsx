import { LinkIcon } from "lucide-react";
import { LinkBCDI } from "./LinkType";

export const LinkBC: LinkBCDI = {
	groupId: "text",
	icon: <LinkIcon size={16} />,
	id: "link",
	label: "Link",
	props: {
		content: {},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},

			typography: {},
		},
	},
	type: "link",
} satisfies LinkBCDI;
