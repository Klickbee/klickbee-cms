import { Image } from "lucide-react";
import { ImageBCDI } from "./ImageType";

export const ImageBC: ImageBCDI = {
	groupId: "media",
	icon: <Image size={16} />,
	id: "image",
	label: "Image",
	props: {
		content: {
			alt: "Image",
			src: "https://via.placeholder.com/150",
		},
		style: {
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
		},
	},
	type: "image",
} satisfies ImageBCDI;
