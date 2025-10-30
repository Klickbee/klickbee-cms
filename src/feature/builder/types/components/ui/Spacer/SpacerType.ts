import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

export interface SpacerBcStyleProps
	extends Pick<ComponentStyleProps, "sizeAndSpacing"> {}

export interface SpacerBcContentProps {}

export interface SpacerBCI extends BuilderComponent {
	props: {
		style: SpacerBcStyleProps;
		content: SpacerBcContentProps;
	};
}
