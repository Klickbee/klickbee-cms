import { Box } from "lucide-react";
import { ContainerBCI } from "@/feature/builder/types/components/ui/Container/ContainerType";

export const ContainerBC: ContainerBCI = {
	groupId: "layout",
	icon: <Box size={16} />,
	id: "container",
	label: "Container",
	name: "Container",
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
} satisfies ContainerBCI;
