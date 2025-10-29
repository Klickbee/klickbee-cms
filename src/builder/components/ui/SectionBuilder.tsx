"use client";

import React, { useContext } from "react";
import EmptyChildrenPlaceholder from "@/builder/components/ui/_partials/EmptyChildrenPlaceholder";
import { useBuilderMaxWidth } from "@/builder/hooks/useBuilderMaxWidth";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import {
	BuilderComponent,
	canHaveChildren,
} from "@/builder/types/components/components";
import { DragDropContext } from "@/components/builder/_partials/DragAndDropContext";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";

interface SectionProps {
	component: BuilderComponent;
	isRoot?: boolean;
	region?: "header" | "content" | "footer";
}

export const SectionBuilder: React.FC<SectionProps> = ({
	component,
	isRoot = false,
	region = "content",
}) => {
	// Initialize the builder max width cache from settings
	useBuilderMaxWidth();
	// Get the setTargetComponent function from context
	const dragDropContext = useContext(DragDropContext);

	return (
		<section
			className={`relative bg-white ${isRoot ? "w-full" : ""}`}
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
