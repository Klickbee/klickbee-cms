import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

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
