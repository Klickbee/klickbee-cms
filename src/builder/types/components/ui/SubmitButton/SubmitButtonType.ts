import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface SubmitButtonBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
	> {}

export interface SubmitButtonBcContentProps
	extends Pick<ComponentContentProps, "text"> {}

export interface SubmitButtonBCI extends BuilderComponent {
	props: {
		style: SubmitButtonBcStyleProps;
		content: SubmitButtonBcContentProps;
	};
}
