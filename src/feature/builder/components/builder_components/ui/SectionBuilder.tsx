"use client";

import React, { MouseEventHandler, useContext } from "react";
import { DragDropContext } from "@/feature/builder/components/_partials/DragAndDropContext";
import EmptyChildrenPlaceholder from "@/feature/builder/components/builder_components/ui/_partials/EmptyChildrenPlaceholder";
import { useBuilderMaxWidth } from "@/feature/builder/hooks/useBuilderMaxWidth";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import {
	BuilderComponent,
	canHaveChildren,
} from "@/feature/builder/types/components/components";
import { ComponentRenderer } from "../../../lib/renderers/ComponentRenderer";

interface SectionProps {
	component: BuilderComponent;
	isRoot?: boolean;
	region?: "header" | "content" | "footer";
	className: string;
	onClick: MouseEventHandler;
	onDragLeave: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
	onDragOver: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
}

export const SectionBuilder: React.FC<SectionProps> = ({
	component,
	isRoot = false,
	region = "content",
	onClick,
	onDragLeave,
	onDragOver,
	className,
}) => {
	// Initialize the builder max width cache from settings
	useBuilderMaxWidth();
	// Get the setTargetComponent function from context
	const dragDropContext = useContext(DragDropContext);

	return (
		<section
			className={`relative bg-white ${isRoot ? "w-full" : ""} ${className}`}
			onClick={onClick}
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			style={{
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			{!component.children || component.children.length === 0 ? (
				<EmptyChildrenPlaceholder />
			) : (
				<>
					{component.children
						.slice() // Create a copy of the array to avoid mutating the original
						.sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order
						.map((child) => (
							<ComponentRenderer
								component={child}
								isDropTarget={
									dragDropContext?.targetComponent ===
									child.id
								}
								key={child.id}
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
								region={region}
							/>
						))}
				</>
			)}
		</section>
	);
};
