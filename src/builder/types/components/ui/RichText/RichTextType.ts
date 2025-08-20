import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

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
