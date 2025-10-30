import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface ImageProps {
	component: BuilderComponent;
}

export const Image: React.FC<ImageProps> = ({ component }) => {
	// Default image source and alt text if not provided
	const src =
		(component.props?.content?.src as string) ||
		"https://placehold.co/1024?text=Upload+or+select+an+image";
	const alt = (component.props?.content?.alt as string) || "Image";
	const href = (component.props?.content?.href as string) || "";
	const openInNewTab =
		(component.props?.content?.openInNewTab as boolean) || false;

	const width = component.props?.style?.sizeAndSpacing?.width || {
		number: 400,
		unit: "px",
	};
	const height = component.props?.style?.sizeAndSpacing?.height || {
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
			className="max-w-full h-auto"
			height={height.number}
			src={src}
			width={width.number}
		/>
	);

	if (href) {
		const target = openInNewTab ? "_blank" : undefined;
		const rel = openInNewTab ? "noopener noreferrer" : undefined;
		return (
			<a
				className="inline-block"
				href={href}
				rel={rel}
				style={commonStyle}
				target={target}
			>
				{img}
			</a>
		);
	}

	return React.cloneElement(img, { style: commonStyle });
};
