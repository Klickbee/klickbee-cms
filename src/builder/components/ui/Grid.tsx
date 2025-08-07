import React from "react";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";
import { BuilderComponent } from "../../types/components/component";

interface GridProps {
	component: BuilderComponent;
}

export const Grid: React.FC<GridProps> = ({ component }) => {
	// Default to 2 columns if not specified
	const columns = component.props?.style?.layout?.grid?.columns || 2;

	return (
		<div
			className="relative   bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			{/* Render children in a grid layout */}
			{component.children && component.children.length > 0 && (
				<div
					className=" grid ga"
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
								<ComponentRenderer component={child} />
							</div>
						))}
				</div>
			)}
		</div>
	);
};
