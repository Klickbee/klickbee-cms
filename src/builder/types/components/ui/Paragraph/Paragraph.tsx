import { Type } from "lucide-react";
import { ParagraphBCDI } from "./ParagraphType";

export const ParagraphBC: ParagraphBCDI = {
	groupId: "text",
	icon: <Type size={16} />,
	id: "paragraph",
	label: "Paragraph",
	props: {
		content: {},
		style: {
			effects: {},

			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "paragraph",
} satisfies ParagraphBCDI;
