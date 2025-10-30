import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

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
