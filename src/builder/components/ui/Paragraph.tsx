import React from "react";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../types/components/components";

interface ParagraphProps {
	component: BuilderComponent;
}

export const Paragraph: React.FC<ParagraphProps> = ({ component }) => {
	// Default text content if not provided
	const content =
		(component.props?.content?.text as string) || "Paragraph content";

	return (
		<p
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			{content}
		</p>
	);
};
