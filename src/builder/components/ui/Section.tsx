import React from "react";
import { BuilderComponent } from "@/builder/types/components/component";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";

interface SectionProps {
	component: BuilderComponent;
}

export const Section: React.FC<SectionProps> = ({ component }) => {
	return (
		<section className="relative bg-white w-full">
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
		</section>
	);
};
