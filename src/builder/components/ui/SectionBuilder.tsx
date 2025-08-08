import React, { useContext } from "react";
import EmptyChildrenPlaceholder from "@/builder/components/ui/_partials/EmptyChildrenPlaceholder";
import {
	BuilderComponent,
	canHaveChildren,
} from "@/builder/types/components/component";
import { DragDropContext } from "@/components/builder/_partials/DragAndDropContext";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";

interface SectionProps {
	component: BuilderComponent;
}

export const SectionBuilder: React.FC<SectionProps> = ({ component }) => {
	// Get the setTargetComponent function from context
	const dragDropContext = useContext(DragDropContext);

	return (
		<section className="relative bg-white w-full p-2">
			{!component.children || component.children.length === 0 ? (
				<EmptyChildrenPlaceholder />
			) : (
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
		</section>
	);
};
