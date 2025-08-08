import { Code as Embed } from "lucide-react";
import { EmbedBCDI } from "./EmbedType";

export const EmbedBC: EmbedBCDI = {
	groupId: "media",
	icon: <Embed size={16} />,
	id: "embed",
	label: "Embed",
	props: {
		content: {},
		style: {
			layout: {},
			sizeAndSpacing: {},
		},
	},
	type: "embed",
} satisfies EmbedBCDI;
