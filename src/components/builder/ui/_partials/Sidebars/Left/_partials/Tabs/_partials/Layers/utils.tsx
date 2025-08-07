import { Box } from "lucide-react";
import {
	ComponentItem,
	componentsList,
} from "@/builder/definitions/componentsList";
import { BaseComponent } from "@/builder/types/components/component";

/**
 * Gets the icon for a component based on its type
 */
export const getComponentIcon = (component: BaseComponent) => {
	const componentDef = componentsList.find(
		(c: ComponentItem) => c.id === component.type,
	);
	return componentDef ? componentDef.icon : <Box className="w-4 h-4" />;
};

/**
 * Maps content items to a tree structure
 */
export const mapContentToTree = (content: ComponentItem[]): ComponentItem[] => {
	return content.map((component) => {
		const base = componentsList.find((c) => c.id === component.group) || {
			group: component.group || "",
			icon: getComponentIcon(component as unknown as BaseComponent),
			id: component.id,
			label: component.label || component.group,
			type: component.type || "undefined",
		};
		return {
			...base,
			children: component.children
				? mapContentToTree(component.children)
				: [],
			id: component.id,
			label: component.label || base.label,
		};
	});
};
