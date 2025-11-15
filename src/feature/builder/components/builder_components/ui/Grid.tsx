"use client";

import React, { useContext } from "react";
import { DragDropContext } from "@/feature/builder/components/_partials/DragAndDropContext";
import EmptyChildrenPlaceholder from "@/feature/builder/components/builder_components/ui/_partials/EmptyChildrenPlaceholder";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";
import { ComponentRenderer } from "../../../lib/renderers/ComponentRenderer";
import {
	BuilderComponent,
	canHaveChildren,
} from "../../../types/components/components";

interface GridProps {
	component: BuilderComponent;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
	onDragOver?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
}

export const Grid: React.FC<GridProps> = ({
	component,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	// Default to 2 columns if not specified
	const columns =
		(component.props?.style as ComponentStyleProps)?.layout?.grid
			?.columns || 2;
	// Get the setTargetComponent function from context
	const dragDropContext = useContext(DragDropContext);

	// Root grid container styles
	const rootStyle: React.CSSProperties = {
		order: component.order || 0,
		...mapStylePropsToCss(component.props?.style),
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
	};

	return (
		<div
			className={["grid ga", className].filter(Boolean).join(" ")}
			onClick={onClick}
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			style={rootStyle}
		>
			{/* Render children in a grid layout */}
			{!component.children || component.children.length === 0 ? (
				<EmptyChildrenPlaceholder />
			) : (
				component.children
					.slice() // Create a copy of the array to avoid mutating the original
					.sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order
					.map((child) => (
						<div
							className="border border-dotted border-gray-200 p-2"
							key={child.id}
							onClick={onClick}
							onDragLeave={onDragLeave}
							onDragOver={onDragOver}
						>
							<ComponentRenderer
								component={child}
								isDropTarget={
									dragDropContext?.targetComponent ===
									child.id
								}
								onDragLeave={() => {
									if (dragDropContext) {
										dragDropContext.setTargetComponent(
											null,
										);
									}
								}}
								onDragOver={(e) => {
									// Only allow dropping onto container components
									if (
										canHaveChildren(child.type) &&
										dragDropContext
									) {
										e.stopPropagation();
										e.preventDefault();
										dragDropContext.setTargetComponent(
											child.id,
										);
									}
								}}
								region={"content"}
							/>
						</div>
					))
			)}
		</div>
	);
};
