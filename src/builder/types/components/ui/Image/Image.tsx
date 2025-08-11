import { Image } from "lucide-react";
import { ImageBCI } from "./ImageType";

export const ImageBC: ImageBCI = {
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
} satisfies ImageBCI;
