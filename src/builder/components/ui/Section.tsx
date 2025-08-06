import React from "react";
import { Component } from "@/builder/types/components/component";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";

interface SectionProps {
	component: Component;
}

export const Section: React.FC<SectionProps> = ({ component }) => {
	return (
		<section
			className="relative border border-dashed border-gray-300 p-4 min-h-[100px] bg-white"
			style={{
				left: component.position?.x,
				position: component.position ? "absolute" : "relative",
				top: component.position?.y,
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1">
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
		</section>
	);
};
