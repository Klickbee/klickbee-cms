import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";
import { BuilderComponent } from "../../../types/components/components";

interface SpacerProps {
	component: BuilderComponent;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
	onDragOver?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
}

export const Spacer: React.FC<SpacerProps> = ({
	component,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	// Default height if not provided
	const height = (component.props?.style as ComponentStyleProps)
		?.sizeAndSpacing?.height || {
		number: 50,
		unit: "px",
	};

	return (
		<div
			className={["relative  bg-gray-100", className]
				.filter(Boolean)
				.join(" ")}
			onClick={onClick}
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			style={{
				height: `${height.number}${height.unit}`, // Use height from props or default to 50px
				order: component.order || 0, // Use order property for positioning
				width: "100%",
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<div className="absolute top-0 left-0 text-white text-xs px-2 py-1"></div>
		</div>
	);
};
