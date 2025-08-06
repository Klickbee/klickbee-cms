import React from "react";
import { Component } from "../../types/components/component";

interface ImageProps {
	component: Component;
}

export const Image: React.FC<ImageProps> = ({ component }) => {
	// Default image source and alt text if not provided
	const src =
		(component.props?.src as string) ||
		"https://via.placeholder.com/400x300";
	const alt = (component.props?.alt as string) || "Image";
	const width = (component.props?.width as number) || 400;
	const height = (component.props?.height as number) || 300;

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
			<div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 z-10">
				{component.label}
			</div>

			<div className="mt-6">
				<img
					alt={alt}
					className="max-w-full h-auto"
					height={height}
					src={src}
					width={width}
				/>
			</div>
		</div>
	);
};
