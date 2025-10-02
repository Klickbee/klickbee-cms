import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface SectionBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "layout"
		| "sizeAndSpacing"
		| "position"
	> {}

export interface SectionBcContentProps {}

export interface SectionBCI extends BuilderComponent {
	props: {
		style: SectionBcStyleProps;
		content: SectionBcContentProps;
	};
}
