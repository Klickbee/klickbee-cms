import { FileText } from "lucide-react";
import { FormRichTextBCI } from "./FormRichTextType";

export const FormRichTextBC: FormRichTextBCI = {
	groupId: "form",
	icon: <FileText size={16} />,
	id: "formrichtext",
	label: "Rich Text",
	props: {
		content: {
			content: "<p>Form Rich Text</p>",
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
} satisfies FormRichTextBCI;
