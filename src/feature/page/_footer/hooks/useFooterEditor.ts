"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
	BuilderComponent,
	canHaveChildren,
} from "@/feature/builder/types/components/components";
import type { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import type { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";
import { usePageFooterByPage } from "@/feature/page/_footer/queries/usePageFooter";

export type DropPosition = "before" | "after" | "inside";

function cloneContent(content: unknown): BuilderComponent[] {
	if (Array.isArray(content)) {
		return JSON.parse(JSON.stringify(content)) as BuilderComponent[];
	}
	// When footer content is a single object, normalize to array
	if (content && typeof content === "object") {
		return [JSON.parse(JSON.stringify(content)) as BuilderComponent];
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

function normalizeOrder(arr: BuilderComponent[]) {
	arr.forEach((c, i) => {
		c.order = i + 1;
	});
}

function remapIdsDeep(node: BuilderComponent): BuilderComponent {
	const newId = `${node.type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
	return {
		...node,
		id: newId,
		children: node.children?.map((c) =>
			remapIdsDeep(c as BuilderComponent),
		),
	};
}

function updateStyleInTree(
	list: BuilderComponent[],
	targetId: string,
	newStyle: Record<string, unknown>,
): boolean {
	for (const node of list) {
		if (node.id === targetId) {
			const nextStyle: ComponentStyleProps = {
				...(newStyle as ComponentStyleProps),
			};
			node.props = { ...node.props, style: nextStyle };
			return true;
		}
		if (
			node.children &&
			updateStyleInTree(
				node.children as BuilderComponent[],
				targetId,
				newStyle,
			)
		) {
			return true;
		}
	}
	return false;
}

function updateContentInTree(
	list: BuilderComponent[],
	targetId: string,
	newContent: Record<string, unknown>,
): boolean {
	for (const node of list) {
		if (node.id === targetId) {
			const currentContent: ComponentContentProps =
				(node.props?.content as ComponentContentProps) || {};
			const nextContent: ComponentContentProps = {
				...currentContent,
				...(newContent as ComponentContentProps),
			};
			node.props = { ...node.props, content: nextContent };
			return true;
		}
		if (
			node.children &&
			updateContentInTree(
				node.children as BuilderComponent[],
				targetId,
				newContent,
			)
		) {
			return true;
		}
	}
	return false;
}

export function useFooterEditor(pageId?: number) {
	const queryClient = useQueryClient();
	const { data: footer } = usePageFooterByPage(pageId);

	function setFooterContent(
		next: BuilderComponent[] | BuilderComponent | null,
	) {
		if (!pageId) return;
		const prev = footer ?? null;
		const content = Array.isArray(next) ? next : next ? [next] : [];
		queryClient.setQueryData(
			["pageFooterByPage", pageId],
			prev ? { ...prev, content } : { id: -1, content },
		);
	}

	function withWorking<T>(
		fn: (working: BuilderComponent[]) => T,
	): T | undefined {
		if (!pageId) return;
		const working = cloneContent(footer?.content ?? []);
		const result = fn(working);
		setFooterContent(working as unknown as BuilderComponent[]);
		return result;
	}

	function deleteComponent(componentId: string) {
		withWorking((working) => {
			const removeFrom = (list: BuilderComponent[]): boolean => {
				for (let i = 0; i < list.length; i++) {
					const c = list[i];
					if (c.id === componentId) {
						list.splice(i, 1);
						normalizeOrder(list);
						return true;
					}
					if (
						c.children &&
						removeFrom(c.children as BuilderComponent[])
					)
						return true;
				}
				return false;
			};
			removeFrom(working);
		});
	}

	function duplicateComponent(componentId: string) {
		withWorking((working) => {
			const found = findNodeAndParent(working, componentId, null);
			if (!found) return;
			const { node, parent } = found;
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
		});
	}

	function moveComponent(
		sourceId: string,
		_sourceParentId: string | null,
		targetId: string,
		_targetParentId: string | null,
		dropPosition: DropPosition,
	) {
		withWorking((working) => {
			const find = findNodeAndParent(working, sourceId, null);
			if (!find) return;
			const { node: sourceNode } = find;

			// Prevent dropping into itself/descendant when inside
			if (dropPosition === "inside") {
				const targetFound = findNodeAndParent(working, targetId, null);
				if (!targetFound) return;
				if (sourceNode.id === targetFound.node.id) return;
				// naive descendant check
				const isDescendant = (
					root: BuilderComponent,
					id: string,
				): boolean => {
					if (!root.children) return false;
					for (const child of root.children as BuilderComponent[]) {
						if (child.id === id) return true;
						if (isDescendant(child, id)) return true;
					}
					return false;
				};
				if (isDescendant(sourceNode, targetFound.node.id)) return;
			}

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

			const targetFound = findNodeAndParent(working, targetId, null);
			if (!targetFound) return;

			if (dropPosition === "inside") {
				if (!canHaveChildren(targetFound.node.type)) return;
				if (!targetFound.node.children) targetFound.node.children = [];
				(targetFound.node.children as BuilderComponent[]).push(removed);
				normalizeOrder(targetFound.node.children as BuilderComponent[]);
				return;
			}

			const containerList: BuilderComponent[] = targetFound.parent
				? (targetFound.parent.children as BuilderComponent[])
				: working;
			const idx = containerList.findIndex(
				(c) => c.id === targetFound.node.id,
			);
			const insertIndex = dropPosition === "before" ? idx : idx + 1;
			containerList.splice(insertIndex, 0, removed);
			normalizeOrder(containerList);
		});
	}

	function pasteStyle(targetId: string, style: Record<string, unknown>) {
		withWorking((working) => {
			updateStyleInTree(working, targetId, style);
		});
	}

	function pasteContent(targetId: string, content: Record<string, unknown>) {
		withWorking((working) => {
			updateContentInTree(working, targetId, content);
		});
	}

	function containsNode(id: string): boolean {
		const content = cloneContent(footer?.content ?? []);
		const find = findNodeAndParent(content, id, null);
		return !!find;
	}

	function addComponent(
		newComponent: BuilderComponent,
		targetId?: string | null,
	) {
		withWorking((working) => {
			if (!targetId) {
				working.push(newComponent);
				normalizeOrder(working);
				return;
			}
			const found = findNodeAndParent(working, targetId, null);
			if (!found) {
				working.push(newComponent);
				normalizeOrder(working);
				return;
			}
			const parent = found.node; // insert as child of targetId
			if (!parent.children) parent.children = [];
			(parent.children as BuilderComponent[]).push(newComponent);
			normalizeOrder(parent.children as BuilderComponent[]);
		});
	}

	return {
		footer,
		setFooterContent,
		deleteComponent,
		duplicateComponent,
		moveComponent,
		pasteStyle,
		pasteContent,
		containsNode,
		addComponent,
	};
}
