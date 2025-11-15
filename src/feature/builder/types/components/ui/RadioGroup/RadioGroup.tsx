import { CircleCheck } from "lucide-react";
import { RadioGroupBCI } from "./RadioGroupType";

export const RadioGroupBC: RadioGroupBCI = {
	groupId: "form",
	icon: <CircleCheck size={16} />,
	id: "radiogroup",
	label: "Radio Group",
	name: "RadioGroup",
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
} satisfies RadioGroupBCI;
