import { Image } from "lucide-react";
import { ImageBCI } from "./ImageType";

export const ImageBC: ImageBCI = {
	groupId: "media",
	icon: <Image size={16} />,
	id: "image",
	label: "Image",
	name: "Image",
	props: {
		content: {
			alt: "Image",
			src: "https://placehold.co/1024?text=Upload+or+select+an+image",
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
