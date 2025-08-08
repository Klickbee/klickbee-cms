import { CircleCheck } from "lucide-react";
import { RadioGroupBCDI } from "./RadioGroupType";

export const RadioGroupBC: RadioGroupBCDI = {
	groupId: "form",
	icon: <CircleCheck size={16} />,
	id: "radiogroup",
	label: "Radio Group",
	props: {
		content: {},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "radiogroup",
} satisfies RadioGroupBCDI;
