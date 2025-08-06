import React from "react";
import { BuilderComponent } from "../../types/components/component";

interface SpacerProps {
	component: BuilderComponent;
}

export const Spacer: React.FC<SpacerProps> = ({ component }) => {
	// Default height if not provided
	const height = (component.props?.height as number) || 50;

	return (
		<div
			className="relative border border-dashed border-gray-300 bg-gray-100"
			style={{
				height: `${height}px`,
				order: component.order || 0, // Use order property for positioning
				width: "100%",
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div className="absolute top-0 left-0 text-white text-xs px-2 py-1"></div>
		</div>
	);
};
