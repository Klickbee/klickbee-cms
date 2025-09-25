import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface SliderBcStyleProps
	extends Pick<
		ComponentStyleProps,
		"bordersAndCorners" | "effects" | "layout" | "sizeAndSpacing"
	> {}

export interface SliderItem {
	src: string;
	alt?: string;
}

export interface SliderBcContentProps
	extends Pick<ComponentContentProps, "autoplay" | "items"> {
	interval?: number;
	showArrows?: boolean;
	showDots?: boolean;
}

export interface SliderBCI extends BuilderComponent {
	props: {
		style: SliderBcStyleProps;
		content: SliderBcContentProps;
	};
}
