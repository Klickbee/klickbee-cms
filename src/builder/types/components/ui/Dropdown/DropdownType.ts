import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface DropdownBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
	> {}

export interface DropdownBcContentProps
	extends Pick<ComponentContentProps, "defaultText" | "name" | "options"> {}

export interface DropdownBCI extends BuilderComponent {
	props: {
		style: DropdownBcStyleProps;
		content: DropdownBcContentProps;
	};
}

export interface DropdownBCDI
	extends DropdownBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
