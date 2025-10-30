import { toast } from "sonner";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import {
	BuilderComponent,
	canHaveChildren,
} from "@/feature/builder/types/components/components";

export type DropPosition = "before" | "after" | "inside";

function cloneContent(
	content: BuilderComponent[] | unknown,
): BuilderComponent[] {
	if (Array.isArray(content)) {
		return JSON.parse(JSON.stringify(content)) as BuilderComponent[];
	}
	return [];
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

function isDescendant(
	root: BuilderComponent,
	possibleDescendantId: string,
): boolean {
	if (!root.children) return false;
	for (const child of root.children) {
		if (child.id === possibleDescendantId) return true;
		if (isDescendant(child, possibleDescendantId)) return true;
	}
	return false;
}

function normalizeOrder(arr: BuilderComponent[]) {
	arr.forEach((c, i) => {
		c.order = i + 1;
	});
}

export function useMoveComponent() {
	const { currentPage, setCurrentPage } = useCurrentPageStore();

	function moveComponent(
		sourceId: string,
		sourceParentId: string | null,
		targetId: string,
		targetParentId: string | null,
		dropPosition: DropPosition,
	) {
		const working = cloneContent(currentPage.content);

		// Find source
		const sourceFound = findNodeAndParent(working, sourceId, null);
		if (!sourceFound) return;
		const { node: sourceNode } = sourceFound;

		// Prevent dropping into self/descendant when inside
		if (dropPosition === "inside") {
			const targetFound = findNodeAndParent(working, targetId, null);
			if (!targetFound) return;
			if (sourceNode.id === targetFound.node.id) return; // same node
			if (isDescendant(sourceNode, targetFound.node.id)) return; // cannot nest into descendant
		}

		// Remove source from its current location
		const removeFrom = (
			list: BuilderComponent[],
			id: string,
		): BuilderComponent | null => {
			for (let i = 0; i < list.length; i++) {
				const c = list[i];
				if (c.id === id) {
					const [removed] = list.splice(i, 1);
					normalizeOrder(list);
					return removed;
				}
				if (c.children && c.children.length) {
					const removed = removeFrom(
						c.children as BuilderComponent[],
						id,
					);
					if (removed) return removed;
				}
			}
			return null;
		};

		const removed = removeFrom(working, sourceId);
		if (!removed) return;

		// Insert into target location
		const insertInside = (
			parent: BuilderComponent,
			child: BuilderComponent,
		) => {
			if (!canHaveChildren(parent.type)) return false;
			if (!parent.children) parent.children = [];
			parent.children.push(child);
			normalizeOrder(parent.children);
			return true;
		};

		const insertBeforeAfter = (
			list: BuilderComponent[],
			targetIdX: string,
			child: BuilderComponent,
			pos: "before" | "after",
		) => {
			const idx = list.findIndex((c) => c.id === targetIdX);
			if (idx === -1) return false;
			const insertIndex = pos === "before" ? idx : idx + 1;
			list.splice(insertIndex, 0, child);
			normalizeOrder(list);
			return true;
		};

		const targetFound = findNodeAndParent(working, targetId, null);
		if (!targetFound) return;

		let ok = false;
		if (dropPosition === "inside") {
			ok = insertInside(targetFound.node, removed);
			if (!ok) {
				toast.error("Target component cannot contain children");
				return;
			}
		} else {
			// If before/after, we need the sibling list = target's parent children or root array
			const containerList: BuilderComponent[] = targetFound.parent
				? (targetFound.parent.children as BuilderComponent[])
				: working;

			// Prevent moving to within own subtree when sibling list is subset of removed
			if (isDescendant(removed, targetFound.node.id)) {
				// would create a loop by moving parent next to child under same subtree
				toast.error(
					"Cannot move a parent relative to its own descendant",
				);
				return;
			}

			ok = insertBeforeAfter(
				containerList,
				targetId,
				removed,
				dropPosition,
			);
		}

		if (!ok) return;

		setCurrentPage({ ...currentPage, content: working });
	}

	return { moveComponent };
}
