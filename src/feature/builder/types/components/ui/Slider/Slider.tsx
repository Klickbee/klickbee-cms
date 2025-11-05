import { Images } from "lucide-react";
import { SliderBCI } from "./SliderType";

export const SliderBC: SliderBCI = {
	groupId: "media",
	icon: <Images size={16} />,
	id: "slider",
	label: "Slider",
	name: "Slider",
	props: {
		content: {
			autoplay: true,
			interval: 3000,
			items: [
				"https://placehold.co/1024?text=Slide+1",
				"https://placehold.co/1024??text=Slide+2",
			],
			showArrows: true,
			showDots: true,
		},
		style: {
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
		},
	},
	type: "slider",
} satisfies SliderBCI;
