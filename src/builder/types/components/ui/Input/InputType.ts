import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface InputBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
	> {}

export interface InputBcContentProps
	extends Pick<ComponentContentProps, "name" | "placeholder" | "required"> {}

export interface InputBCI extends BuilderComponent {
	props: {
		style: InputBcStyleProps;
		content: InputBcContentProps;
	};
}
