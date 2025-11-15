import { Box } from "lucide-react";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { componentsList } from "@/feature/builder/types/components/ui/componentsList";

/**
 * Gets the icon for a component based on its type
 */
export const getComponentIcon = (component: BuilderComponent) => {
	const componentDef = componentsList.find(
		(c: BuilderComponent) => c.id === component.label,
	);
	return componentDef ? componentDef.icon : <Box className="w-4 h-4" />;
};

/**
 * Maps content items to a tree structure
 */
export const mapContentToTree = (
	content: BuilderComponent[],
): BuilderComponent[] => {
	return content.map((component) => {
		const base = componentsList.find((c) => c.type === component.type) || {
			group: component.groupId || "",
			name: component.name,
			icon: getComponentIcon(component),
			id: component.id,
			label: component.label || component.groupId,
			type: component.type || "undefined",
		};
		return {
			...base,
			children: component.children
				? mapContentToTree(component.children)
				: [],
			groupId: component.groupId,
			id: component.id,
			props: component.props || {},
			order: component.order || 0,
			label: component.label || base.label,
		};
	});
};
