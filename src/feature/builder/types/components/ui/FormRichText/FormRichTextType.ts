import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

export interface FormRichTextBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
	> {}

export interface FormRichTextBcContentProps
	extends Pick<ComponentContentProps, "content"> {}

export interface FormRichTextBCI extends BuilderComponent {
	props: {
		style: FormRichTextBcStyleProps;
		content: FormRichTextBcContentProps;
	};
}
