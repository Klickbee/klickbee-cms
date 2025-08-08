import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

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

export interface FileUploadBCDI
	extends FileUploadBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
