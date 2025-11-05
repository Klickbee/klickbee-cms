import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";
import { BuilderComponent } from "../../../types/components/components";

interface ImageProps {
	component: BuilderComponent;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: React.DragEventHandler<HTMLElement>;
	onDragOver?: React.DragEventHandler<HTMLElement>;
}

export const Image: React.FC<ImageProps> = ({
	component,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	// Default image source and alt text if not provided
	const src =
		(component.props?.content?.src as string) ||
		"https://placehold.co/1024?text=Upload+or+select+an+image";
	const alt = (component.props?.content?.alt as string) || "Image";
	const href = (component.props?.content?.href as string) || "";
	const openInNewTab =
		(component.props?.content?.openInNewTab as boolean) || false;

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

	const commonStyle: React.CSSProperties = {
		order: component.order || 0, // Use order property for positioning
		...mapStylePropsToCss(component.props?.style),
	};

	const img = (
		<img
			alt={alt}
			className={["max-w-full h-auto", className]
				.filter(Boolean)
				.join(" ")}
			height={height.number}
			onClick={onClick}
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			src={src}
			style={commonStyle}
			width={width.number}
		/>
	);

	if (href) {
		const target = openInNewTab ? "_blank" : undefined;
		const rel = openInNewTab ? "noopener noreferrer" : undefined;
		return (
			<a
				className={className}
				href={href}
				onClick={onClick}
				onDragLeave={onDragLeave}
				onDragOver={onDragOver}
				rel={rel}
				style={commonStyle}
				target={target}
			>
				{img}
			</a>
		);
	}

	return img;
};
