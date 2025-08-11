import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface TextBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
	> {}

export interface TextBcContentProps
	extends Pick<ComponentContentProps, "text"> {}

export interface TextBCI extends BuilderComponent {
	props: {
		style: TextBcStyleProps;
		content: TextBcContentProps;
	};
}
