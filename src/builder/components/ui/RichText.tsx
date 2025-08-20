import React from "react";
import { BuilderComponent } from "../../types/components/components";

interface RichTextProps {
	component: BuilderComponent;
}

export const RichText: React.FC<RichTextProps> = ({ component }) => {
	// Default rich text content if not provided
	const content =
		(component.props?.content?.content as string) ||
		"<p>Rich text content</p>";

	return (
		<div
			className="relative   bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div
				className=" text-gray-700"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
	);
};
