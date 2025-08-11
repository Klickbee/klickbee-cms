import { FileText } from "lucide-react";
import { RichTextBCI } from "./RichTextType";

export const RichTextBC: RichTextBCI = {
	groupId: "text",
	icon: <FileText size={16} />,
	id: "richtext",
	label: "Rich Text",
	props: {
		content: {
			content: "<p>Rich Text</p>",
		},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},

			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "richtext",
} satisfies RichTextBCI;
