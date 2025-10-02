import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface ButtonBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
		| "position"
	> {}

export interface ButtonBcContentProps
	extends Pick<ComponentContentProps, "href" | "text" | "icon"> {}

export interface ButtonBCI extends BuilderComponent {
	props: {
		style: ButtonBcStyleProps;
		content: ButtonBcContentProps;
	};
}
