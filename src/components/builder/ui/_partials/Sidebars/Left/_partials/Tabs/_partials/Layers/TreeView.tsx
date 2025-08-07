import {
	closestCenter,
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	UniqueIdentifier,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import {
	BaseComponent,
	CONTAINER_COMPONENTS,
} from "@/builder/types/components/component";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { EmptyState } from "./EmptyState";
import { TreeNode } from "./TreeNode";

interface TreeViewProps {
	contentNodes: BaseComponent[];
}

export function TreeView({ contentNodes }: TreeViewProps) {
	const { confirmDelete } = useDeleteComponentContext();
	const [activeId, setActiveId] = useState<string | null>(null);
	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	// Function to find a component by ID in the tree
	const findComponentById = (
		nodes: BaseComponent[],
		id: string,
	): {
		node: BaseComponent;
		parent: BaseComponent | null;
		index: number;
	} => {
		if (!nodes || !Array.isArray(nodes)) {
			console.error("Invalid nodes because empty nodes or not an array");
			throw new Error(
				"Invalid nodes because empty nodes or not an array",
			);
		}

		try {
			for (let i = 0; i < nodes.length; i++) {
				if (nodes[i].id === id) {
					return { index: i, node: nodes[i], parent: null };
				}

				if (
					nodes[i].children &&
					Array.isArray(nodes[i].children) &&
					(nodes[i].children?.length || 0) > 0
				) {
					// @ts-ignore
					const result = findComponentById(nodes[i].children, id);
					if (result.node) {
						return result.parent
							? result
							: {
									index: result.index,
									node: result.node,
									parent: nodes[i],
								};
					}
				}
			}
		} catch (error) {
			console.error(error);
			throw new Error("Invalid nodes" + error);
		}
		return { index: -1, node: {} as BaseComponent, parent: null };
	};

	// Function to create a deep copy of the content nodes
	const deepCopyNodes = (nodes: BaseComponent[]): BaseComponent[] => {
		return nodes.map((node) => ({
			...node,
			children: node.children ? deepCopyNodes(node.children) : undefined,
		}));
	};

	// Function to flatten the tree for finding nodes by ID
	const flattenTree = (nodes: BaseComponent[]): BaseComponent[] => {
		return nodes.reduce((acc, node) => {
			acc.push(node);
			if (node.children && node.children.length > 0) {
				acc.push(...flattenTree(node.children));
			}
			return acc;
		}, [] as BaseComponent[]);
	};

	// Function to find a node by ID in the flat tree
	const findNodeById = (id: string): BaseComponent | undefined => {
		const flatTree = flattenTree(contentNodes);
		return flatTree.find((node) => node.id === id);
	};

	// Get all component IDs for the sortable context
	const getAllComponentIds = (): string[] => {
		return flattenTree(contentNodes).map((node) => node.id);
	};

	// Handle the start of dragging
	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);
	};

	// Process a drop target ID
	const processTargetId = (
		id: string,
	): { actualId: string; isContainer: boolean } => {
		let isContainer = false;
		let actualId = id;

		if (id.startsWith("droppable-")) {
			isContainer = true;
			actualId = id.replace("droppable-", "");
		}

		return { actualId, isContainer };
	};

	// Handle reordering within the same parent
	const handleReorderWithinParent = (
		draggedItem: {
			node: BaseComponent;
			parent: BaseComponent | null;
			index: number;
		},
		targetItem: {
			node: BaseComponent;
			parent: BaseComponent | null;
			index: number;
		},
		newContentNodes: BaseComponent[],
	): BaseComponent[] => {
		// Validate inputs
		if (
			!draggedItem.node ||
			!targetItem.node ||
			draggedItem.index < 0 ||
			targetItem.index < 0
		) {
			return newContentNodes;
		}

		try {
			// Get the array of siblings
			let siblings: BaseComponent[];

			if (draggedItem.parent && draggedItem.parent.children) {
				siblings = draggedItem.parent.children;
			} else {
				siblings = newContentNodes;
			}

			// Validate indices are within bounds
			if (
				draggedItem.index >= siblings.length ||
				targetItem.index >= siblings.length
			) {
				return newContentNodes;
			}

			// Reorder the siblings
			const reorderedSiblings = arrayMove(
				siblings,
				draggedItem.index,
				targetItem.index,
			);

			// Update the parent's children or the top-level array
			if (draggedItem.parent) {
				draggedItem.parent.children = reorderedSiblings;
			} else {
				// For top-level nodes, return the reordered array directly
				return reorderedSiblings;
			}

			return newContentNodes;
		} catch (error) {
			console.error("Error in reordering siblings:", error);
			return newContentNodes;
		}
	};

	// Handle moving to a different parent
	const handleMoveToNewParent = (
		draggedItem: {
			node: BaseComponent;
			parent: BaseComponent | null;
			index: number;
		},
		targetItem: {
			node: BaseComponent;
			parent: BaseComponent | null;
			index: number;
		},
		newContentNodes: BaseComponent[],
	): BaseComponent[] => {
		// Validate inputs
		if (!draggedItem.node || !targetItem.node) {
			return newContentNodes;
		}

		// Skip if target is not a valid container
		if (!CONTAINER_COMPONENTS.includes(targetItem.node.type)) {
			return newContentNodes;
		}

		// Check if we're dropping onto the component's own parent
		const isDroppingOnOwnParent =
			draggedItem.parent && draggedItem.parent.id === targetItem.node.id;

		// Skip the removal step if dropping on own parent
		if (!isDroppingOnOwnParent) {
			// Remove the dragged item from its original parent
			if (draggedItem.parent && draggedItem.parent.children) {
				// Remove from parent's children array
				draggedItem.parent.children =
					draggedItem.parent.children.filter(
						(child) => child.id !== draggedItem.node.id,
					);
			} else {
				// Remove from top-level array
				newContentNodes = newContentNodes.filter(
					(node) => node.id !== draggedItem.node.id,
				);
			}

			// Initialize target's children array if it doesn't exist
			if (!targetItem.node.children) {
				targetItem.node.children = [];
			}

			// Set the order for the dragged item
			try {
				if (targetItem.node.children.length > 0) {
					// Get all orders, defaulting to 0 for any undefined orders
					const orders = targetItem.node.children.map(
						(child) => child.order || 0,
					);
					// Calculate the max order and add 1
					draggedItem.node.order = Math.max(...orders) + 1;
				} else {
					// If the target has no children, set order to 0
					draggedItem.node.order = 0;
				}
			} catch (error) {
				console.error(error);
				// Fallback in case of any error in order calculation
				draggedItem.node.order = targetItem.node.children.length;
			}

			// Add the dragged item to the target's children
			targetItem.node.children.push(draggedItem.node);
		}

		return newContentNodes;
	};

	// Main drag end handler
	const handleDragEnd = (event: DragEndEvent) => {
		try {
			const { active, over } = event;
			// Reset active ID when drag ends
			setActiveId(null);

			// If no over element, do nothing
			if (!over || !active) return;

			// Get the IDs as strings
			const activeId = active.id as string;
			const overId = over.id as string;

			// Validate IDs
			if (!activeId || !overId) return;

			// Process the target ID
			const { actualId: targetId, isContainer } = processTargetId(overId);

			// Check if this is a self-drop (dropping on itself)
			const isSelfDrop = isContainer && targetId === activeId;
			if (isSelfDrop || activeId === overId) return;

			// Create a deep copy of the content nodes
			let newContentNodes = deepCopyNodes(contentNodes);

			// Find the dragged component and target component
			const draggedItem = findComponentById(newContentNodes, activeId);
			const targetItem = findComponentById(newContentNodes, targetId);

			// If either component is not found, do nothing
			if (!draggedItem.node || !targetItem.node) return;

			// Check if they have the same parent
			const haveSameParent =
				(draggedItem.parent === null && targetItem.parent === null) ||
				(draggedItem.parent &&
					targetItem.parent &&
					draggedItem.parent.id === targetItem.parent.id);

			// Handle the drag based on whether it's within the same parent or to a new parent
			if (haveSameParent && !isContainer) {
				// Reordering within the same parent
				newContentNodes = handleReorderWithinParent(
					draggedItem,
					targetItem,
					newContentNodes,
				);
			} else {
				// Moving to a different parent
				newContentNodes = handleMoveToNewParent(
					draggedItem,
					targetItem,
					newContentNodes,
				);
			}

			// Update the page content with the modified tree
			setCurrentPage({
				...currentPage,
				content: newContentNodes,
			});
		} catch (error) {
			// Log the error but don't crash the component
			console.error("Error in drag and drop operation:", error);
		}
	};

	return (
		<div>
			{contentNodes.length > 0 ? (
				<DndContext
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
					onDragStart={handleDragStart}
				>
					<SortableContext
						items={getAllComponentIds()}
						strategy={verticalListSortingStrategy}
					>
						{contentNodes.map((contentNode: BaseComponent) => (
							<ContextMenu key={contentNode.id}>
								<ContextMenuTrigger>
									<TreeNode
										id={contentNode.id}
										node={contentNode}
										parentId={null}
									/>
								</ContextMenuTrigger>
								<ContextMenuContent>
									<ContextMenuItem
										className={"text-destructive"}
										onClick={() =>
											confirmDelete(
												contentNode.id,
												null,
												contentNode.type,
											)
										}
									>
										Delete
									</ContextMenuItem>
								</ContextMenuContent>
							</ContextMenu>
						))}
					</SortableContext>
					<DragOverlay>
						{activeId && findNodeById(activeId) ? (
							<TreeNode
								id={activeId}
								isDragging={true}
								node={findNodeById(activeId)!}
								parentId={null}
							/>
						) : null}
					</DragOverlay>
				</DndContext>
			) : (
				<EmptyState />
			)}
		</div>
	);
}
