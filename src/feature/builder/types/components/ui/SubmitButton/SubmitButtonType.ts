import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

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
