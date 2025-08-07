import { Plus } from "lucide-react";
import React, { useContext } from "react";
import EmptyChildrenPlaceholder from "@/builder/components/ui/_partials/EmptyChildrenPlaceholder";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import {
	BuilderComponent,
	canHaveChildren,
} from "@/builder/types/components/component";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";

// Create a context to pass down the targetComponent state and setTargetComponent function
export const DragDropContext = React.createContext<{
	targetComponent: string | null;
	setTargetComponent: (id: string | null) => void;
} | null>(null);

interface SectionProps {
	component: BuilderComponent;
}

export const Section: React.FC<SectionProps> = ({ component }) => {
	// Get the setTargetComponent function from context
	const dragDropContext = useContext(DragDropContext);

	return (
		<section className="relative bg-white w-full">
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
