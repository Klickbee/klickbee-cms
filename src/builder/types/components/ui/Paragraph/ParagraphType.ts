import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface ParagraphBcStyleProps
	extends Pick<
		ComponentStyleProps,
		"effects" | "sizeAndSpacing" | "typography"
	> {}

export interface ParagraphBcContentProps
	extends Pick<ComponentContentProps, "text"> {}

export interface ParagraphBCI extends BuilderComponent {
	props: {
		style: ParagraphBcStyleProps;
		content: ParagraphBcContentProps;
	};
}

export interface ParagraphBCDI
	extends ParagraphBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
