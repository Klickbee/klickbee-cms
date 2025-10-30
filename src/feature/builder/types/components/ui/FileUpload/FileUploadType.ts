import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

export interface FileUploadBcStyleProps
	extends Pick<
		ComponentStyleProps,
		| "background"
		| "bordersAndCorners"
		| "effects"
		| "sizeAndSpacing"
		| "typography"
	> {}

export interface FileUploadBcContentProps
	extends Pick<ComponentContentProps, "maxFileSize" | "mimeTypes" | "name"> {}

export interface FileUploadBCI extends BuilderComponent {
	props: {
		style: FileUploadBcStyleProps;
		content: FileUploadBcContentProps;
	};
}
