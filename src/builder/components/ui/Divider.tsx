import React from "react";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import type { BuilderComponent } from "@/builder/types/components/components";

interface DividerProps {
	component: BuilderComponent;
}

export const Divider: React.FC<DividerProps> = ({ component }) => {
	const baseStyle: React.CSSProperties = {};

	const borders = component.props?.style?.bordersAndCorners;
	const hasCustomBorder = Boolean(
		borders?.borderWidth || borders?.borderStyle || borders?.borderColor,
	);

	// Provide a subtle default divider line if no border is configured
	if (!hasCustomBorder) {
		baseStyle.borderTopWidth = "1px";
		baseStyle.borderTopStyle = "solid";
		baseStyle.borderTopColor = "#e5e7eb"; // Tailwind gray-200 equivalent
	}

	return (
		<div
			className="w-full h-full"
			style={{
				order: component.order || 0,
				width: "100%",
				height: "100%",
				...baseStyle,
				// Allow editor-defined styles to override defaults
				...mapStylePropsToCss(component.props?.style),
			}}
		/>
	);
};
