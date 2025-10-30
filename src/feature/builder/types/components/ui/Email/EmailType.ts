import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

export interface EmailBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
	> {}

export interface EmailBcContentProps
	extends Pick<ComponentContentProps, "name" | "placeholder" | "required"> {}

export interface EmailBCI extends BuilderComponent {
	props: {
		style: EmailBcStyleProps;
		content: EmailBcContentProps;
	};
}
