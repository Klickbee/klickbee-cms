import { Text as TextIcon } from "lucide-react";
import { TextBCDI } from "./TextType";

export const TextBC: TextBCDI = {
	groupId: "text",
	icon: <TextIcon size={16} />,
	id: "text",
	label: "Text",
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
} satisfies TextBCDI;
