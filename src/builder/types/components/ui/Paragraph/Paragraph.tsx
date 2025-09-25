import { Type } from "lucide-react";
import { ParagraphBCI } from "./ParagraphType";

export const ParagraphBC: ParagraphBCI = {
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
} satisfies ParagraphBCI;
