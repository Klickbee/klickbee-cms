import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface VideoBcStyleProps
	extends Pick<
		ComponentStyleProps,
		"bordersAndCorners" | "effects" | "layout" | "sizeAndSpacing"
	> {}

export interface VideoBcContentProps
	extends Pick<ComponentContentProps, "autoplay" | "controls" | "src"> {}

export interface VideoBCI extends BuilderComponent {
	props: {
		style: VideoBcStyleProps;
		content: VideoBcContentProps;
	};
}
