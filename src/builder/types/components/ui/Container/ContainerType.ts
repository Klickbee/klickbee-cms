import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

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

export interface ContainerBCDI
	extends ContainerBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
