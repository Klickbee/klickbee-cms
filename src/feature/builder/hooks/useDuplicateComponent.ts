"use client";

import { toast } from "sonner";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/feature/builder/types/components/components";

function cloneContent(
	content: BuilderComponent[] | unknown,
): BuilderComponent[] {
	if (Array.isArray(content)) {
		return JSON.parse(JSON.stringify(content)) as BuilderComponent[];
	}
	return [];
}

function generateNewId(type: string) {
	return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function remapIdsDeep(node: BuilderComponent): BuilderComponent {
	const newId = generateNewId(node.type);
	return {
		...node,
		children: node.children?.map((c) =>
			remapIdsDeep(c as BuilderComponent),
		),
		id: newId,
	};
}

function normalizeOrder(arr: BuilderComponent[]) {
	arr.forEach((c, i) => {
		c.order = i + 1;
	});
}

function findNodeAndParent(
	components: BuilderComponent[],
	nodeId: string,
	parent: BuilderComponent | null = null,
): { node: BuilderComponent; parent: BuilderComponent | null } | null {
	for (const comp of components) {
		if (comp.id === nodeId) return { node: comp, parent };
		if (comp.children && comp.children.length) {
			const found = findNodeAndParent(
				comp.children as BuilderComponent[],
				nodeId,
				comp,
			);
			if (found) return found;
		}
	}
	return null;
}

export function useDuplicateComponent() {
	const { currentPage, setCurrentPage } = useCurrentPageStore();

	function duplicateComponent(componentId: string) {
		const working = cloneContent(currentPage.content);
		if (!working.length) return;

		const found = findNodeAndParent(working, componentId, null);
		if (!found) return;
		const { node, parent } = found;

		// Deep clone and remap IDs
		const clone = remapIdsDeep(JSON.parse(JSON.stringify(node)));

		if (parent) {
			const siblings = parent.children as BuilderComponent[];
			const idx = siblings.findIndex((c) => c.id === node.id);
			const insertIndex = idx === -1 ? siblings.length : idx + 1;
			siblings.splice(insertIndex, 0, clone);
			normalizeOrder(siblings);
		} else {
			const idx = working.findIndex((c) => c.id === node.id);
			const insertIndex = idx === -1 ? working.length : idx + 1;
			working.splice(insertIndex, 0, clone);
			normalizeOrder(working);
		}

		setCurrentPage({ ...currentPage, content: working });
		toast.success("Component duplicated", {
			description: "Remember to save your changes (Ctrl+S)",
			duration: 2500,
		});
	}

	return { duplicateComponent };
}
