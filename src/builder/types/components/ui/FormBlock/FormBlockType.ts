import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface FormBlockBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "layout"
		| "sizeAndSpacing"
	> {}

export interface FormBlockBcContentProps
	extends Pick<ComponentContentProps, "errorMessage" | "successMessage"> {}

export interface FormBlockBCI extends BuilderComponent {
	props: {
		style: FormBlockBcStyleProps;
		content: FormBlockBcContentProps;
	};
}
