import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface RadioGroupBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
		| "layout"
	> {}

export interface RadioGroupBcContentProps
	extends Pick<ComponentContentProps, "options" | "question"> {}

export interface RadioGroupBCI extends BuilderComponent {
	props: {
		style: RadioGroupBcStyleProps;
		content: RadioGroupBcContentProps;
	};
}
