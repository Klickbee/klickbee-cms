import React from "react";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../types/components/components";

interface VideoProps {
	component: BuilderComponent;
}

export const Video: React.FC<VideoProps> = ({ component }) => {
	// Default image source and alt text if not provided
	const src =
		(component.props?.content?.src as string) ||
		"https://via.placeholder.com/400x300";
	const width = component.props?.style?.sizeAndSpacing?.width || {
		number: 400,
		unit: "px",
	};
	const height = component.props?.style?.sizeAndSpacing?.height || {
		number: 300,
		unit: "px",
	};

	return (
		<div
			className="relative   bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<div className="">
				<video
					className="max-w-full h-auto"
					height={height.number + height.unit}
					src={src}
					width={width.number + width.unit}
				/>
			</div>
		</div>
	);
};
