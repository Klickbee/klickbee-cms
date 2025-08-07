import React from "react";
import { BuilderComponent } from "@/builder/types/components/component";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";

interface ContainerProps {
	component: BuilderComponent;
}

export const Container: React.FC<ContainerProps> = ({ component }) => {
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
								key={child.id}
							/>
						))}
				</div>
			)}
		</div>
	);
};
