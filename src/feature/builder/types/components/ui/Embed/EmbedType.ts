import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

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
