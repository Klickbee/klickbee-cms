import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface CheckboxBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
		| "layout"
	> {}

export interface CheckboxBcContentProps
	extends Pick<ComponentContentProps, "defaultChecked" | "label"> {}

export interface CheckboxBCI extends BuilderComponent {
	props: {
		style: CheckboxBcStyleProps;
		content: CheckboxBcContentProps;
	};
}
