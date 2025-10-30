import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

export interface GridBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "layout"
		| "sizeAndSpacing"
	> {}

export interface GridBcContentProps {}

export interface GridBCI extends BuilderComponent {
	props: {
		style: GridBcStyleProps;
		content: GridBcContentProps;
	};
}
