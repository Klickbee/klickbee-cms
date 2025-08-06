import React from "react";
import { BuilderComponent } from "@/builder/types/components/component";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";

interface SectionProps {
	component: BuilderComponent;
}

export const Section: React.FC<SectionProps> = ({ component }) => {
	return (
		<section className="relative border border-dashed border-gray-300 p-4 min-h-[100px] bg-white w-full">
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
