import { Box } from "lucide-react";
import { componentsList } from "@/builder/definitions/componentsList";
import { BaseComponent } from "@/builder/types/components/component";

/**
 * Gets the icon for a component based on its type
 */
export const getComponentIcon = (component: BaseComponent) => {
	const componentDef = componentsList.find(
		(c: BaseComponent) => c.id === component.label,
	);
	return componentDef ? componentDef.icon : <Box className="w-4 h-4" />;
};

/**
 * Maps content items to a tree structure
 */
export const mapContentToTree = (content: BaseComponent[]): BaseComponent[] => {
	return content.map((component) => {
		const base = componentsList.find((c) => c.type === component.type) || {
			group: component.groupId || "",
			icon: getComponentIcon(component),
			id: component.id,
			label: component.label || component.groupId,
			order: component.order || 0,
			type: component.type || "undefined",
		};
		return {
			...base,
			children: component.children
				? mapContentToTree(component.children)
				: [],
			groupId: component.groupId,
			id: component.id,
			label: component.label || base.label,
		};
	});
};
