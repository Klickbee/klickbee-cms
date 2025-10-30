import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

export interface ParagraphBcStyleProps
	extends Pick<
		ComponentStyleProps,
		"effects" | "sizeAndSpacing" | "typography"
	> {}

export interface ParagraphBcContentProps
	extends Pick<ComponentContentProps, "text"> {}

export interface ParagraphBCI extends BuilderComponent {
	props: {
		style: ParagraphBcStyleProps;
		content: ParagraphBcContentProps;
	};
}
