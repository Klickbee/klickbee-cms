import React from "react";
import { BuilderComponent } from "@/builder/types/components/component";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";

interface ContainerProps {
	component: BuilderComponent;
}

export const Container: React.FC<ContainerProps> = ({ component }) => {
	return (
		<div
			className="relative border border-dashed border-gray-300 p-4 max-w-screen-lg mx-auto bg-white"
			style={{
				left: component.position?.x,
				position: component.position ? "absolute" : "relative",
				top: component.position?.y,
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			{/* Render children if they exist */}
			{component.children && component.children.length > 0 && (
				<div className="mt-6">
					{component.children.map((child) => (
						<ComponentRenderer component={child} key={child.id} />
					))}
				</div>
			)}
		</div>
	);
};
