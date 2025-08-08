import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface SpacerBcStyleProps
	extends Pick<ComponentStyleProps, "sizeAndSpacing"> {}

export interface SpacerBcContentProps {}

export interface SpacerBCI extends BuilderComponent {
	props: {
		style: SpacerBcStyleProps;
		content: SpacerBcContentProps;
	};
}

export interface SpacerBCDI
	extends SpacerBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
