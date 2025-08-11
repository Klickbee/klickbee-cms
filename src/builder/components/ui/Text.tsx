import React from "react";
import { BuilderComponent } from "../../types/components/components";

interface TextProps {
	component: BuilderComponent;
}

export const Text: React.FC<TextProps> = ({ component }) => {
	// Default text content if not provided
	const content =
		(component.props?.content?.text as string) || "Text content";

	return (
		<div
			className="relative   bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<p className=" text-gray-700">{content}</p>
		</div>
	);
};
