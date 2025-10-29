import { Box } from "lucide-react";
import { ContainerBCI } from "@/builder/types/components/ui/Container/ContainerType";

export const ContainerBC: ContainerBCI = {
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
			sizeAndSpacing: {
				margin: {
					bottom: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
					key: "default-margin",
					left: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
					right: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
					top: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
				},
				padding: {
					bottom: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
					key: "default-padding",
					left: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
					right: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
					top: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
				},
			},
		},
	},
	type: "container",
} satisfies ContainerBCI;
