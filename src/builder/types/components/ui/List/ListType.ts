import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface ListBcStyleProps
	extends Required<
		Pick<
			ComponentStyleProps,
			| "effects"
			| "sizeAndSpacing"
			| "typography"
			| "background"
			| "bordersAndCorners"
		>
	> {}

export interface ListBcContentProps
	extends Required<Pick<ComponentContentProps, "items" | "listType">> {}

export interface ListBCI extends BuilderComponent {
	props: {
		style: ListBcStyleProps;
		content: ListBcContentProps;
	};
}

export interface ListBCDI
	extends ListBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
