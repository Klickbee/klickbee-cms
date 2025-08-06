import React from "react";
import { Component } from "../../types/components/component";

interface TextProps {
	component: Component;
}

export const Text: React.FC<TextProps> = ({ component }) => {
	// Default text content if not provided
	const content = (component.props?.content as string) || "Text content";

	return (
		<div
			className="relative border border-dashed border-gray-300 p-4 bg-white"
			style={{
				left: component.position?.x,
				position: component.position ? "absolute" : "relative",
				top: component.position?.y,
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div className="absolute top-0 left-0 bg-gray-500 text-white text-xs px-2 py-1">
				{component.label}
			</div>

			<p className="mt-6 text-gray-700">{content}</p>
		</div>
	);
};
