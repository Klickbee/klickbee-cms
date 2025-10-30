import { Minus } from "lucide-react";
import { DividerBCI } from "@/feature/builder/types/components/ui/Divider/DividerType";

export const DividerBC: DividerBCI = {
	groupId: "text",
	icon: <Minus size={16} />,
	id: "divider",
	label: "Divider",
	props: {
		content: {
			orientation: "horizontal",
			size: "md",
		},
		style: {
			bordersAndCorners: {},
			effects: {},

			sizeAndSpacing: {},
		},
	},
	type: "divider",
} satisfies DividerBCI;
