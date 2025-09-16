import React from "react";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
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
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<p className=" text-gray-700">{content}</p>
		</div>
	);
};
