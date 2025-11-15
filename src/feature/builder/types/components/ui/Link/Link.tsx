import { LinkIcon } from "lucide-react";
import { LinkBCI } from "./LinkType";

export const LinkBC: LinkBCI = {
	groupId: "text",
	icon: <LinkIcon size={16} />,
	id: "link",
	label: "Link",
	name: "Link",
	props: {
		content: { href: "", openInNewTab: false, text: "Link" },
		style: {},
	},
	type: "link",
} satisfies LinkBCI;
