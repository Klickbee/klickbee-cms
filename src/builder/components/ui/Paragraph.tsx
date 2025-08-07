import React from "react";
import { BuilderComponent } from "../../types/components/component";

interface ParagraphProps {
	component: BuilderComponent;
}

export const Paragraph: React.FC<ParagraphProps> = ({ component }) => {
	// Default text content if not provided
	const content =
		(component.props?.content?.text as string) || "Paragraph content";

	return (
		<div
			className="relative   bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<p className=" text-gray-700 leading-relaxed">{content}</p>
		</div>
	);
};
