import React from "react";
import { BuilderComponent } from "../../types/components/components";

interface SpacerProps {
	component: BuilderComponent;
}

export const Spacer: React.FC<SpacerProps> = ({ component }) => {
	// Default height if not provided
	const height = component.props?.style?.sizeAndSpacing?.height || {
		number: 50,
		unit: "px",
	};

	return (
		<div
			className="relative  bg-gray-100"
			style={{
				height: `${height.number}${height.unit}`, // Use height from props or default to 50px
				order: component.order || 0, // Use order property for positioning
				width: "100%",
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div className="absolute top-0 left-0 text-white text-xs px-2 py-1"></div>
		</div>
	);
};
