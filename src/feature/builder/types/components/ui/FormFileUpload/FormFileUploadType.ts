import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

export interface FormFileUploadBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
	> {}

export interface FormFileUploadBcContentProps
	extends Pick<ComponentContentProps, "maxFileSize" | "mimeTypes" | "name"> {}

export interface FormFileUploadBCI extends BuilderComponent {
	props: {
		style: FormFileUploadBcStyleProps;
		content: FormFileUploadBcContentProps;
	};
}
