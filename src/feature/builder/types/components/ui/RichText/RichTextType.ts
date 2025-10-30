import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

export interface RichTextBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "effects"
		| "sizeAndSpacing"
		| "typography"
		| "background"
		| "bordersAndCorners"
	> {}

export interface RichTextBcContentProps
	extends Pick<ComponentContentProps, "content"> {}

export interface RichTextBCI extends BuilderComponent {
	props: {
		style: RichTextBcStyleProps;
		content: RichTextBcContentProps;
	};
}
