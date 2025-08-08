import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

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

export interface FormRichTextBCDI
	extends FormRichTextBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
