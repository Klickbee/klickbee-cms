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
		style: {},
	},
	type: "section",
} satisfies SectionBCI;
