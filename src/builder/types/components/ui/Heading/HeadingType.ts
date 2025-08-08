import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface HeadingBcStyleProps
	extends Pick<
		ComponentStyleProps,
		"effects" | "sizeAndSpacing" | "typography"
	> {}

export interface HeadingBcContentProps
	extends Pick<ComponentContentProps, "level" | "text"> {}

export interface HeadingBCI extends BuilderComponent {
	props: {
		style: HeadingBcStyleProps;
		content: HeadingBcContentProps;
	};
}

export interface HeadingBCDI
	extends HeadingBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
