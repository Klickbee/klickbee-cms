import { Video } from "lucide-react";
import { VideoBCI } from "./VideoType";

export const VideoBC: VideoBCI = {
	groupId: "media",
	icon: <Video size={16} />,
	id: "video",
	label: "Video",
	name: "Video",
	props: {
		content: {},
		style: {
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
		},
	},
	type: "video",
} satisfies VideoBCI;
