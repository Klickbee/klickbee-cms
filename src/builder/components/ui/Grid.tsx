import React, { useContext } from "react";
import EmptyChildrenPlaceholder from "@/builder/components/ui/_partials/EmptyChildrenPlaceholder";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import { DragDropContext } from "@/components/builder/_partials/DragAndDropContext";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";
import {
	BuilderComponent,
	canHaveChildren,
} from "../../types/components/components";

interface GridProps {
	component: BuilderComponent;
}

export const Grid: React.FC<GridProps> = ({ component }) => {
	// Default to 2 columns if not specified
	const columns = component.props?.style?.layout?.grid?.columns || 2;
	// Get the setTargetComponent function from context
	const dragDropContext = useContext(DragDropContext);

	return (
		<div
			className="relative   bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			{/* Render children in a grid layout */}
			{!component.children || component.children.length === 0 ? (
				<EmptyChildrenPlaceholder />
			) : (
				<div
					className="grid ga"
					style={{
						gridTemplateColumns: `repeat(${columns}, 1fr)`,
					}}
				>
					{component.children
						.slice() // Create a copy of the array to avoid mutating the original
						.sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order
						.map((child) => (
							<div
								className="border border-dotted border-gray-200 p-2"
								key={child.id}
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
								/>
							</div>
						))}
				</div>
			)}
		</div>
	);
};
