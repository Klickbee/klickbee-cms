import { Code as Embed } from "lucide-react";
import { EmbedBCI } from "./EmbedType";

export const EmbedBC: EmbedBCI = {
	groupId: "media",
	icon: <Embed size={16} />,
	id: "embed",
	label: "Embed",
	name: "Embed",
	props: {
		content: {},
		style: {
			layout: {},
			sizeAndSpacing: {},
		},
	},
	type: "embed",
} satisfies EmbedBCI;
