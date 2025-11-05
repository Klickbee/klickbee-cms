import { Text as TextIcon } from "lucide-react";
import { TextBCI } from "./TextType";

export const TextBC: TextBCI = {
	groupId: "text",
	icon: <TextIcon size={16} />,
	id: "text",
	label: "Text",
	name: "Text",
	props: {
		content: {
			text: "",
		},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "text",
} satisfies TextBCI;
