import { Heading } from "lucide-react";
import { HeadingBCDI } from "./HeadingType";

export const HeadingBC: HeadingBCDI = {
	groupId: "text",
	icon: <Heading size={16} />,
	id: "heading",
	label: "Heading",
	props: {
		content: {},
		style: {
			effects: {},
			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "heading",
} satisfies HeadingBCDI;
