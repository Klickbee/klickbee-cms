import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";
import { BuilderComponent } from "../../../types/components/components";

interface VideoProps {
	component: BuilderComponent;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
	onDragOver?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
}

export const Video: React.FC<VideoProps> = ({
	component,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	// Default image source and alt text if not provided
	const src =
		(component.props?.content?.src as string) ||
		"https://placehold.co/1024?text=Upload+or+select+a+video";
	const width = (component.props?.style as ComponentStyleProps)
		?.sizeAndSpacing?.width || {
		number: 400,
		unit: "px",
	};
	const height = (component.props?.style as ComponentStyleProps)
		?.sizeAndSpacing?.height || {
		number: 300,
		unit: "px",
	};

	const style = {
		order: component.order || 0, // Use order property for positioning
		...mapStylePropsToCss(component.props?.style),
	};

	return (
		<video
			className={["max-w-full h-auto", className]
				.filter(Boolean)
				.join(" ")}
			height={
				typeof height.number === "number"
					? height.number
					: parseInt(String(height.number))
			}
			onClick={onClick}
			onDragLeave={
				onDragLeave as unknown as React.DragEventHandler<HTMLVideoElement>
			}
			onDragOver={
				onDragOver as unknown as React.DragEventHandler<HTMLVideoElement>
			}
			src={src}
			style={style}
			width={
				typeof width.number === "number"
					? width.number
					: parseInt(String(width.number))
			}
		/>
	);
};
