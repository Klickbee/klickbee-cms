import { GalleryVertical } from "lucide-react";
import { SectionBCI } from "./SectionType";

export const SectionBC: SectionBCI = {
	groupId: "layout",
	icon: <GalleryVertical size={16} />,
	id: "section",
	label: "Section",
	props: {
		content: {},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			layout: {},
			position: {},
			sizeAndSpacing: {},
		},
	},
	type: "section",
} satisfies SectionBCI;
