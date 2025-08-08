import { GalleryVertical } from "lucide-react";
import { SectionBCDI } from "./SectionType";

export const SectionBC: SectionBCDI = {
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
			sizeAndSpacing: {},
		},
	},
	type: "section",
} satisfies SectionBCDI;
