import React from "react";
import { Component } from "../../types/components/component";

interface SpacerProps {
	component: Component;
}

export const Spacer: React.FC<SpacerProps> = ({ component }) => {
	// Default height if not provided
	const height = (component.props?.height as number) || 50;

	return (
		<div
			className="relative border border-dashed border-gray-300 bg-gray-100"
			style={{
				height: `${height}px`,
				left: component.position?.x,
				position: component.position ? "absolute" : "relative",
				top: component.position?.y,
				width: "100%",
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div className="absolute top-0 left-0 bg-gray-500 text-white text-xs px-2 py-1">
				{component.label} ({height}px)
			</div>
		</div>
	);
};
