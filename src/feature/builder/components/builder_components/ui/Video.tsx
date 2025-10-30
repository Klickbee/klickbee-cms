import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface VideoProps {
	component: BuilderComponent;
}

export const Video: React.FC<VideoProps> = ({ component }) => {
	// Default image source and alt text if not provided
	const src =
		(component.props?.content?.src as string) ||
		"https://placehold.co/1024?text=Upload+or+select+a+video";
	const width = component.props?.style?.sizeAndSpacing?.width || {
		number: 400,
		unit: "px",
	};
	const height = component.props?.style?.sizeAndSpacing?.height || {
		number: 300,
		unit: "px",
	};

	return (
		<video
			className="max-w-full h-auto"
			height={height.number + height.unit}
			src={src}
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
			width={width.number + width.unit}
		/>
	);
};
