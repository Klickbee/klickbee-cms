import React from "react";
import { BuilderComponent } from "../../types/components/component";

interface ImageProps {
	component: BuilderComponent;
}

export const Image: React.FC<ImageProps> = ({ component }) => {
	// Default image source and alt text if not provided
	const src =
		(component.props?.content?.src as string) ||
		"https://via.placeholder.com/400x300";
	const alt = (component.props?.content?.alt as string) || "Image";
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
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div className="">
				<img
					alt={alt}
					className="max-w-full h-auto"
					height={height.number}
					src={src}
					width={width.number}
				/>
			</div>
		</div>
	);
};
