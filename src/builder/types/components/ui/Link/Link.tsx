import { LinkIcon } from "lucide-react";
import { LinkBCI } from "./LinkType";

export const LinkBC: LinkBCI = {
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
} satisfies LinkBCI;
