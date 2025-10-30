import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import type { BuilderComponent } from "@/feature/builder/types/components/components";
import type { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";

interface DividerProps {
	component: BuilderComponent;
}

export const Divider: React.FC<DividerProps> = ({ component }) => {
	const baseStyle: React.CSSProperties = {};

	const borders = component.props?.style?.bordersAndCorners;
	const hasCustomBorder = Boolean(
		borders?.borderWidth || borders?.borderStyle || borders?.borderColor,
	);

	const content =
		(component.props?.content as Partial<ComponentContentProps>) || {};
	const orientation = content.orientation ?? "horizontal";
	const size = content.size ?? "md"; // sm | md | lg
	const thickness = size === "sm" ? "1px" : size === "lg" ? "4px" : "2px";

	// Provide a subtle default divider line if no border is configured
	if (!hasCustomBorder) {
		if (orientation === "vertical") {
			baseStyle.borderLeftWidth = thickness;
			baseStyle.borderLeftStyle = "solid";
			baseStyle.borderLeftColor = "#e5e7eb"; // gray-200
		} else {
			baseStyle.borderTopWidth = thickness;
			baseStyle.borderTopStyle = "solid";
			baseStyle.borderTopColor = "#e5e7eb"; // gray-200
		}
	}

	// Sensible defaults per orientation (can be overridden by style props)
	if (orientation === "vertical") {
		// If no explicit height provided via style, give a small default height
		const heightStyle = component.props?.style?.sizeAndSpacing?.height;
		if (!heightStyle) {
			baseStyle.height = "48px";
		}
		// Keep width minimal for a vertical divider
		baseStyle.width = "0"; // allow border to render the line
	} else {
		// Horizontal divider spans full width by default with minimal height
		baseStyle.width = "100%";
		baseStyle.height = "0";
	}

	return (
		<div
			className="relative"
			style={{
				order: component.order || 0,
				...baseStyle,
				// Allow editor-defined styles to override defaults
				...mapStylePropsToCss(component.props?.style),
			}}
		/>
	);
};
