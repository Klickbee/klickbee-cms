import { Box } from "lucide-react";
import { ContainerBCDI } from "@/builder/types/components/ui/Container/ContainerType";

export const ContainerBC: ContainerBCDI = {
	groupId: "layout",
	icon: <Box size={16} />,
	id: "container",
	label: "Container",
	props: {
		content: {},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
		},
	},
	type: "container",
} satisfies ContainerBCDI;
