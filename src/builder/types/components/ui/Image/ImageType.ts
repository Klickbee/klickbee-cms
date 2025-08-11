import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface ImageBcStyleProps
	extends Pick<
		ComponentStyleProps,
		"bordersAndCorners" | "effects" | "layout" | "sizeAndSpacing"
	> {}

export interface ImageBcContentProps
	extends Pick<ComponentContentProps, "alt" | "src"> {}

export interface ImageBCI extends BuilderComponent {
	props: {
		style: ImageBcStyleProps;
		content: ImageBcContentProps;
	};
}
