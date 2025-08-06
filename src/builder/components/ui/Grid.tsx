import React from "react";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";
import { BuilderComponent } from "../../types/components/component";

interface GridProps {
	component: BuilderComponent;
}

export const Grid: React.FC<GridProps> = ({ component }) => {
	// Default to 2 columns if not specified
	const columns = component.props?.columns || 2;

	return (
		<div
			className="relative border border-dashed border-gray-300 p-4 bg-white"
			style={{
				left: component.position?.x,
				position: component.position ? "absolute" : "relative",
				top: component.position?.y,
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			{/* Render children in a grid layout */}
			{component.children && component.children.length > 0 && (
				<div
					className="mt-6 grid gap-4"
					style={{
						gridTemplateColumns: `repeat(${columns}, 1fr)`,
					}}
				>
					{component.children.map((child) => (
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
