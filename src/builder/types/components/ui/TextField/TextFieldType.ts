import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface TextFieldBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
	> {}

export interface TextFieldBcContentProps
	extends Pick<
		ComponentContentProps,
		"name" | "placeholder" | "required" | "type"
	> {}

export interface TextFieldBCI extends BuilderComponent {
	props: {
		style: TextFieldBcStyleProps;
		content: TextFieldBcContentProps;
	};
}
