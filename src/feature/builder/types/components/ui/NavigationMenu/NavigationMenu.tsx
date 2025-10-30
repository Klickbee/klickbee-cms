import { Menu } from "lucide-react";
import { NavigationMenuBCI } from "./NavigationMenuType";

export const NavigationMenuBC: NavigationMenuBCI = {
	groupId: "navigation",
	icon: <Menu size={16} />,
	id: "navigationmenu",
	label: "Navigation Menu",
	props: {
		content: {
			orientation: "horizontal",
			navItems: [
				{ label: "Home", href: "#" },
				{ label: "About", href: "#" },
				{ label: "Contact", href: "#" },
			],
		},
		style: {
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
			typography: {},
			advanced: {},
		},
	},
	type: "navigationmenu",
} satisfies NavigationMenuBCI;
