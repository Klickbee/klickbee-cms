import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface SectionBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "layout"
		| "sizeAndSpacing"
	> {}

export interface SectionBcContentProps {}

export interface SectionBCI extends BuilderComponent {
	props: {
		style: SectionBcStyleProps;
		content: SectionBcContentProps;
	};
}

export interface SectionBCDI
	extends SectionBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
