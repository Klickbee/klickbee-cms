import { Video } from "lucide-react";
import { VideoBCDI } from "./VideoType";

export const VideoBC: VideoBCDI = {
	groupId: "media",
	icon: <Video size={16} />,
	id: "video",
	label: "Video",
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
} satisfies VideoBCDI;
