import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export interface EmbedBcStyleProps
	extends Pick<ComponentStyleProps, "layout" | "sizeAndSpacing"> {}

export interface EmbedBcContentProps
	extends Pick<ComponentContentProps, "code"> {}

export interface EmbedBCI extends BuilderComponent {
	props: {
		style: EmbedBcStyleProps;
		content: EmbedBcContentProps;
	};
}
