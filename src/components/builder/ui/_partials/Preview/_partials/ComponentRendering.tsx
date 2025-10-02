import { ComponentRenderer } from "@/builder/lib/renderers/ComponentRenderer";
import {
	BuilderComponent,
	canHaveChildren,
} from "@/builder/types/components/components";

export default function ComponentRendering({
	content,
	targetComponent,
	setTargetComponent,
}: {
	content: BuilderComponent[];
	targetComponent: string | null;
	setTargetComponent: (id: string | null) => void;
}) {
	if (!Array.isArray(content) || content.length === 0) {
		return null;
	}

	return (
		<>
			{content
				.slice()
				.sort((a, b) => (a.order || 0) - (b.order || 0))
				.map((component) => (
					<div key={component.id}>
						<ComponentRenderer
							component={component}
							isDropTarget={targetComponent === component.id}
							onDragLeave={() => {
								setTargetComponent(null);
							}}
							onDragOver={(e) => {
								if (canHaveChildren(component.type)) {
									e.stopPropagation();
									e.preventDefault();
									setTargetComponent(component.id);
								}
							}}
						/>
					</div>
				))}
		</>
	);
}
