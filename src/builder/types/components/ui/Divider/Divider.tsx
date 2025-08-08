import { Minus } from "lucide-react";
import { DividerBCDI } from "@/builder/types/components/ui/Divider/DividerType";

export const DividerBC: DividerBCDI = {
	groupId: "text",
	icon: <Minus size={16} />,
	id: "divider",
	label: "Divider",
	props: {
		content: {},
		style: {
			bordersAndCorners: {},
			effects: {},

			sizeAndSpacing: {},
		},
	},
	type: "divider",
} satisfies DividerBCDI;
