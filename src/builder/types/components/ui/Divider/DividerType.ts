import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface DividerBcStyleProps
	extends Pick<
		ComponentStyleProps,
		"bordersAndCorners" | "effects" | "sizeAndSpacing"
	> {}

export interface DividerBcContentProps {}

export interface DividerBCI extends BuilderComponent {
	props: {
		style: DividerBcStyleProps;
		content: DividerBcContentProps;
	};
}
