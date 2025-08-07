import React, { useContext } from "react";
import {
	BuilderComponent,
	canHaveChildren,
} from "@/builder/types/components/component";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";
import { DragDropContext } from "./_partials/DragAndDropContext";

interface ContainerProps {
	component: BuilderComponent;
}

export const Container: React.FC<ContainerProps> = ({ component }) => {
	// Get the setTargetComponent function from context
	const dragDropContext = useContext(DragDropContext);

	return (
		<div
			className="relative   max-w-screen-lg mx-auto bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			{/* Render children if they exist */}
			{component.children && component.children.length > 0 && (
				<div className="">
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
							/>
						))}
				</div>
			)}
		</div>
	);
};
