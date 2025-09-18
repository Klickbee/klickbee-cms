import { RectangleHorizontal as Rectangle } from "lucide-react";
import { ButtonBCI } from "./ButtonType";

export const ButtonBC: ButtonBCI = {
	groupId: "text",
	icon: <Rectangle size={16} />,
	id: "button",
	label: "Button",
	props: {
		content: {
			href: "#",
			// Use a serializable value for icon to avoid server/client reference issues during save
			icon: "",
			text: "Button",
		},
		style: {
			background: {
				color: "#0000",
			},
			bordersAndCorners: {},
			effects: {},
			sizeAndSpacing: {
				padding: {
					bottom: {
						max: 1,
						maxWidth: 1440,
						min: 1,
						sizeUnit: "rem",
					},
					key: "button-padding",
					left: {
						max: 2,
						maxWidth: 1440,
						min: 2,
						sizeUnit: "rem",
					},
					right: {
						max: 2,
						maxWidth: 1440,
						min: 2,
						sizeUnit: "rem",
					},
					top: {
						max: 1,
						maxWidth: 1440,
						min: 1,
						sizeUnit: "rem",
					},
				},
				width: {
					number: 100,
					unit: "px",
				},
			},
			typography: {
				color: "#fff",
				fontFamily: "Inter",
				fontSize: {
					max: 1.5,
					maxWidth: 1440,
					min: 1,
					sizeUnit: "rem",
				},
			},
		},
	},
	type: "button",
} satisfies ButtonBCI;
