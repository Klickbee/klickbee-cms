import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface TextAreaBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
	> {}

export interface TextAreaBcContentProps
	extends Pick<ComponentContentProps, "name" | "placeholder" | "required"> {}

export interface TextAreaBCI extends BuilderComponent {
	props: {
		style: TextAreaBcStyleProps;
		content: TextAreaBcContentProps;
	};
}

export interface TextAreaBCDI
	extends TextAreaBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
