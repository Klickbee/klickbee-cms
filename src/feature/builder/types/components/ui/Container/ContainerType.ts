import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

export interface ContainerBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "layout"
		| "sizeAndSpacing"
	> {}

export interface ContainerBcContentProps {}

export interface ContainerBCI extends BuilderComponent {
	props: {
		style: ContainerBcStyleProps;
		content: ContainerBcContentProps;
	};
}
