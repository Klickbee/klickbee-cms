import { Plus } from "lucide-react";
import React from "react";
import { BuilderComponent } from "@/builder/types/components/component";
import { ComponentRenderer } from "../../lib/renderers/ComponentRenderer";

interface SectionProps {
	component: BuilderComponent;
}

export const Section: React.FC<SectionProps> = ({ component }) => {
	return (
		<section className="relative bg-white w-full">
			{!component.children || component.children.length === 0 ? (
				<div className={"h-[50px] flex items-center justify-center"}>
					<Plus size={18} />
				</div>
			) : (
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
