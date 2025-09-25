import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface NavigationMenuBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "bordersAndCorners"
		| "effects"
		| "layout"
		| "sizeAndSpacing"
		| "typography"
		| "advanced"
	> {}

export interface NavigationMenuItem {
	label: string;
	href: string;
	target?: string;
}

export interface NavigationMenuBcContentProps
	extends Pick<ComponentContentProps, "navItems"> {
	orientation?: "horizontal" | "vertical";
}

export interface NavigationMenuBCI extends BuilderComponent {
	props: {
		style: NavigationMenuBcStyleProps;
		content: NavigationMenuBcContentProps;
	};
}
