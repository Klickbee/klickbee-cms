"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { useDuplicateComponent } from "@/builder/hooks/useDuplicateComponent";
import { useMoveComponent } from "@/builder/hooks/useMoveComponent";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { useStyleClipboardStore } from "@/builder/store/storeStyleClipboard";
import {
	BuilderComponent,
	canHaveChildren,
	isParentComponent,
} from "@/builder/types/components/components";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useCreateHeader } from "@/feature/page/queries/useHeaderActions";
import { cn } from "@/lib/utils";

interface TreeNodeProps {
	id: string;
	node: BuilderComponent;
	level?: number;
	parentId?: string | null;
	isDragging?: boolean;
}

export function TreeNode({ node, level = 0, parentId = null }: TreeNodeProps) {
	const { confirmDelete } = useDeleteComponentContext();
	const [expanded, setExpanded] = useState(true);
	const [overBefore, setOverBefore] = useState(false);
	const [overInside, setOverInside] = useState(false);
	const [overAfter, setOverAfter] = useState(false);
	const setCurrentComponent = useCurrentComponentStore(
		(state) => state.setCurrentComponent,
	);
	const { moveComponent } = useMoveComponent();
	const { duplicateComponent } = useDuplicateComponent();
	const { clipboard, copy } = useStyleClipboardStore();
	const { currentPage, setCurrentPage } = useCurrentPageStore();
	const hasChildren = node.children && node.children.length > 0;
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);

	const { mutate: createHeader } = useCreateHeader();

	const isCurrentComponent = (id: string) => {
		return currentComponent.id === id;
	};

	// DnD helpers
	const onDragStart = (e: React.DragEvent) => {
		e.stopPropagation();
		const payload = JSON.stringify({
			sourceId: node.id,
			sourceParentId: parentId,
		});
		e.dataTransfer.setData("application/x-kb-node", payload);
		e.dataTransfer.effectAllowed = "move";
	};

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const onDropAt =
		(pos: "before" | "after" | "inside") => (e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			try {
				const data = e.dataTransfer.getData("application/x-kb-node");
				if (!data) return;
				const { sourceId, sourceParentId } = JSON.parse(data);
				if (sourceId === node.id) return;
				// Prevent drop inside non-container
				if (pos === "inside" && !canHaveChildren(node.type)) return;
				moveComponent(
					sourceId,
					sourceParentId ?? null,
					node.id,
					parentId ?? null,
					pos,
				);
			} finally {
				setOverBefore(false);
				setOverInside(false);
				setOverAfter(false);
			}
		};

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className={`ml-2`} onDragOver={onDragOver}>
					{/* Drop zone: before */}
					<div
						className={cn(
							"h-1 py-0.5 rounded mx-[-15px] overflow-hidden",
							overBefore ? "bg-foreground/50" : "bg-transparent",
						)}
						onDragEnter={() => setOverBefore(true)}
						onDragLeave={() => setOverBefore(false)}
						onDrop={onDropAt("before")}
					/>
					<div
						className={cn(
							"flex items-center gap-1 py-1.5 px-0.5 cursor-pointer text-sm " +
								"text-primary hover:text-background hover:bg-foreground rounded-md",
							level > 0 && "pl-4",
							isCurrentComponent(node.id)
								? "bg-foreground text-background"
								: "",
							overInside && isParentComponent(node)
								? "ring-2 ring-foreground/60"
								: "",
						)}
						draggable
						onClick={() => {
							setExpanded(
								!isCurrentComponent(node.id) ? true : !expanded,
							);
							// Ensure we set the freshest version of the component from the current page tree
							const findById = (
								list: BuilderComponent[],
								id: string,
							): BuilderComponent | null => {
								for (const n of list) {
									if (n.id === id) return n;
									if (n.children) {
										const found = findById(
											n.children as BuilderComponent[],
											id,
										);
										if (found) return found;
									}
								}
								return null;
							};
							let selected = null as BuilderComponent | null;
							if (Array.isArray(currentPage.content)) {
								selected = findById(
									currentPage.content as BuilderComponent[],
									node.id,
								);
							}
							setCurrentComponent(selected ?? node);
						}}
						onDragEnter={() => setOverInside(true)}
						onDragLeave={() => setOverInside(false)}
						onDragStart={onDragStart}
						onDrop={onDropAt("inside")}
					>
						{hasChildren ? (
							expanded ? (
								<ChevronDown className="w-4 h-4" />
							) : (
								<ChevronRight className="w-4 h-4" />
							)
						) : (
							<span className="w-4 h-4" />
						)}
						{node.icon}
						<span className="ml-2">{node.label}</span>
					</div>
					{/* Children and after zone */}
					<div className="ml-4">
						{expanded &&
							node.children?.map((child: BuilderComponent) => (
								<TreeNode
									id={child.id}
									key={child.id}
									level={level + 1}
									node={child}
									parentId={node.id}
								/>
							))}
					</div>
					<div
						className={cn(
							"h-1 py-0.5 rounded mx-[-15px] overflow-hidden",
							overAfter ? "bg-foreground/50" : "bg-transparent",
						)}
						onDragEnter={() => setOverAfter(true)}
						onDragLeave={() => setOverAfter(false)}
						onDrop={onDropAt("after")}
					/>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={() => duplicateComponent(node.id)}>
					Duplicate (Ctrl+D)
				</ContextMenuItem>
				<ContextMenuItem onClick={() => copy(node.props?.style)}>
					Copy style
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() => {
						if (!clipboard) return;
						const working = Array.isArray(currentPage.content)
							? (JSON.parse(
									JSON.stringify(currentPage.content),
								) as BuilderComponent[])
							: [];
						const update = (list: BuilderComponent[]): boolean => {
							for (const n of list) {
								if (n.id === node.id) {
									n.props = {
										...n.props,
										style: { ...clipboard },
									};
									return true;
								}
								if (
									n.children &&
									update(n.children as BuilderComponent[])
								)
									return true;
							}
							return false;
						};
						if (update(working))
							setCurrentPage({
								...currentPage,
								content: working,
							});
					}}
				>
					Paste style
				</ContextMenuItem>
				{isParentComponent(node) && (
					<>
						<ContextMenuItem
							onClick={() => {
								createHeader({
									content: node,
									pageId: currentPage.id,
								});
							}}
						>
							Set as header
						</ContextMenuItem>
						<ContextMenuItem>Set as footer</ContextMenuItem>
					</>
				)}
				<ContextMenuItem
					className={"text-destructive"}
					onClick={() => confirmDelete(node.id, parentId, node.type)}
				>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
