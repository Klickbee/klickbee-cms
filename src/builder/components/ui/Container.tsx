import React from "react";
import { Component } from "@/builder/types/components/component";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";

interface ContainerProps {
	component: Component;
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
			<div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-2 py-1">
				{component.label}
			</div>

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
