import {
	BuilderComponent,
	BuilderComponentDisplay,
} from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface LinkBcStyleProps
	extends Pick<
		ComponentStyleProps,
		"background" | "bordersAndCorners" | "effects" | "typography"
	> {}

export interface LinkBcContentProps
	extends Pick<ComponentContentProps, "href" | "openInNewTab" | "text"> {}

export interface LinkBCI extends BuilderComponent {
	props: {
		style: LinkBcStyleProps;
		content: LinkBcContentProps;
	};
}

export interface LinkBCDI
	extends LinkBCI,
		Pick<BuilderComponentDisplay, "icon"> {}
