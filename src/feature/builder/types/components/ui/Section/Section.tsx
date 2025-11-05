import { GalleryVertical } from "lucide-react";
import { SectionBCI } from "./SectionType";

export const SectionBC: SectionBCI = {
	groupId: "layout",
	icon: <GalleryVertical size={16} />,
	id: "section",
	label: "Section",
	name: "Section",
	props: {
		content: {},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			layout: {},
			position: {},
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
	type: "section",
} satisfies SectionBCI;
