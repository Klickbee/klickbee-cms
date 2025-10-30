import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

export interface HeadingBcStyleProps
	extends Pick<
		ComponentStyleProps,
		"effects" | "sizeAndSpacing" | "typography"
	> {}

export interface HeadingBcContentProps
	extends Pick<ComponentContentProps, "level" | "text"> {}

export interface HeadingBCI extends BuilderComponent {
	props: {
		style: HeadingBcStyleProps;
		content: HeadingBcContentProps;
	};
}
