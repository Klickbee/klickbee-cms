import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

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
