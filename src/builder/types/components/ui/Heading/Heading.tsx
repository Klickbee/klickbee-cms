import { Heading } from "lucide-react";
import { HeadingBCI } from "./HeadingType";

export const HeadingBC: HeadingBCI = {
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
} satisfies HeadingBCI;
