import { RectangleHorizontal as Rectangle } from "lucide-react";
import { ButtonBCI } from "./ButtonType";

export const ButtonBC: ButtonBCI = {
	groupId: "text",
	icon: <Rectangle size={16} />,
	id: "button",
	label: "Button",
	name: "Button",
	props: {
		content: {
			href: "#",
			// Use a serializable value for icon to avoid server/client reference issues during save
			icon: "",
			// Icon color is optional; when omitted it inherits the button text color
			iconColor: undefined,
			text: "Button",
		},
		style: {},
	},
	type: "button",
} satisfies ButtonBCI;
