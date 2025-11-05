"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import HeaderFooterContextItem from "@/feature/builder/components/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Layers/_partials/HeaderFooterContextItem";
import { useDeleteComponentContext } from "@/feature/builder/contexts/DeleteComponentContext";
import { useDuplicateComponent } from "@/feature/builder/hooks/useDuplicateComponent";
import { useMoveComponent } from "@/feature/builder/hooks/useMoveComponent";
import { useCurrentComponentStore } from "@/feature/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { useStyleClipboardStore } from "@/feature/builder/store/storeStyleClipboard";
import { ComponentName } from "@/feature/builder/types/components/componentMap";
import {
	BuilderComponent,
	canHaveChildren,
	isParentComponent,
} from "@/feature/builder/types/components/components";
import { componentsList } from "@/feature/builder/types/components/ui/componentsList";
import { useFooterEditor } from "@/feature/page/_footer/hooks/useFooterEditor";
import { useHeaderEditor } from "@/feature/page/_header/hooks/useHeaderEditor";
import { cn } from "@/lib/utils";

interface TreeNodeProps {
	id: string;
	node: BuilderComponent;
	level?: number;
	parentId?: string | null;
	isDragging?: boolean;
	type?: "header" | "footer" | "content";
	rootExpand?: boolean;
}

export function TreeNode({
	node,
	level = 0,
	parentId = null,
	type,
	rootExpand = true,
}: TreeNodeProps) {
	const { confirmDelete } = useDeleteComponentContext();
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
	const pageId =
		currentPage?.id && currentPage.id > 0 ? currentPage.id : undefined;
	const headerEditor = useHeaderEditor(pageId);
	const footerEditor = useFooterEditor(pageId);
	const hasChildren = node.children && node.children.length > 0;
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);

	const isCurrentComponent = (id: string) => {
		return currentComponent.id === id;
	};

	// Initialize expanded so that when rootExpand is true we expand parent nodes
	const [expanded, setExpanded] = useState<boolean>(() => {
		if (rootExpand) return !!hasChildren;
		return false;
	});

	useEffect(() => {
		// If rootExpand is false -> force collapse every node (all descendants)
		if (rootExpand === false) {
			setExpanded(false);
			return;
		}

		// If rootExpand is true -> expand every parent node (nodes that have children)
		setExpanded(!!hasChildren);
	}, [rootExpand, hasChildren]);

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

	const onDropAt = (pos: "before" | "after" | "inside") => {
		return (e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			try {
				const data = e.dataTransfer.getData("application/x-kb-node");
				if (!data) return;
				const { sourceId, sourceParentId } = JSON.parse(data);
				if (sourceId === node.id) return;
				// Prevent drop inside non-container
				if (pos === "inside" && !canHaveChildren(node.type)) return;
				if (type === "header") {
					headerEditor.moveComponent(
						sourceId,
						sourceParentId ?? null,
						node.id,
						parentId ?? null,
						pos,
					);
				} else if (type === "footer") {
					footerEditor.moveComponent(
						sourceId,
						sourceParentId ?? null,
						node.id,
						parentId ?? null,
						pos,
					);
				} else {
					moveComponent(
						sourceId,
						sourceParentId ?? null,
						node.id,
						parentId ?? null,
						pos,
					);
				}
			} finally {
				setOverBefore(false);
				setOverInside(false);
				setOverAfter(false);
			}
		};
	};

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className={`ml-2`} onDragOver={onDragOver}>
					{/* Drop zone: before */}
					<div
						className={cn(
							"h-0.5 rounded mx-[-15px] overflow-hidden",
							overBefore
								? "h-1 py-0.5 bg-foreground/50"
								: "bg-transparent",
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
									rootExpand={rootExpand}
									type={type}
								/>
							))}
					</div>
					<div
						className={cn(
							"h-0.5 rounded mx-[-15px] overflow-hidden",
							overAfter
								? " py-0.5 bg-foreground/50"
								: "bg-transparent",
						)}
						onDragEnter={() => setOverAfter(true)}
						onDragLeave={() => setOverAfter(false)}
						onDrop={onDropAt("after")}
					/>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem
					onClick={() => {
						if (type === "header") {
							headerEditor.duplicateComponent(node.id);
						} else if (type === "footer") {
							footerEditor.duplicateComponent(node.id);
						} else {
							duplicateComponent(node.id);
						}
					}}
				>
					Duplicate (Ctrl+D)
				</ContextMenuItem>
				<ContextMenuItem onClick={() => copy(node.props?.style)}>
					Copy style
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() => {
						if (!clipboard) return;
						if (type === "header") {
							headerEditor.pasteStyle(node.id, clipboard);
							return;
						} else if (type === "footer") {
							footerEditor.pasteStyle(node.id, clipboard);
							return;
						}
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
				{/* Add child actions for parent components */}
				{canHaveChildren(node.type) && (
					<>
						<ContextMenuItem
							onClick={() => {
								const listDef = componentsList.find(
									(c) => c.type === "section",
								);
								const newComponent: BuilderComponent = {
									name: listDef?.name as ComponentName,
									groupId:
										(listDef?.groupId as string) ||
										"layout",
									id: `section-${Date.now()}`,
									label: listDef?.label || "Section",
									order: (node.children?.length ?? 0) + 1,
									props: {
										content: listDef?.props?.content || {},
										style: listDef?.props?.style || {},
									},
									type: "section",
								};
								if (type === "header") {
									headerEditor.addComponent(
										newComponent,
										node.id,
									);
								} else if (type === "footer") {
									footerEditor.addComponent(
										newComponent,
										node.id,
									);
								} else {
									const working = Array.isArray(
										currentPage.content,
									)
										? (JSON.parse(
												JSON.stringify(
													currentPage.content,
												),
											) as BuilderComponent[])
										: [];
									const addChild = (
										list: BuilderComponent[],
									): boolean => {
										for (const n of list) {
											if (n.id === node.id) {
												if (!n.children)
													n.children = [];
												(
													n.children as BuilderComponent[]
												).push(newComponent);
												return true;
											}
											if (
												n.children &&
												addChild(
													n.children as BuilderComponent[],
												)
											)
												return true;
										}
										return false;
									};
									if (addChild(working)) {
										setCurrentPage({
											...currentPage,
											content: working,
										});
									}
								}
							}}
						>
							Add section
						</ContextMenuItem>
						<ContextMenuItem
							onClick={() => {
								const listDef = componentsList.find(
									(c) => c.type === "container",
								);
								const newComponent: BuilderComponent = {
									name: listDef?.name as ComponentName,
									groupId:
										(listDef?.groupId as string) ||
										"layout",
									id: `container-${Date.now()}`,
									label: listDef?.label || "Container",
									order: (node.children?.length ?? 0) + 1,
									props: {
										content: listDef?.props?.content || {},
										style: listDef?.props?.style || {},
									},
									type: "container",
								};
								if (type === "header") {
									headerEditor.addComponent(
										newComponent,
										node.id,
									);
								} else if (type === "footer") {
									footerEditor.addComponent(
										newComponent,
										node.id,
									);
								} else {
									const working = Array.isArray(
										currentPage.content,
									)
										? (JSON.parse(
												JSON.stringify(
													currentPage.content,
												),
											) as BuilderComponent[])
										: [];
									const addChild = (
										list: BuilderComponent[],
									): boolean => {
										for (const n of list) {
											if (n.id === node.id) {
												if (!n.children)
													n.children = [];
												(
													n.children as BuilderComponent[]
												).push(newComponent);
												return true;
											}
											if (
												n.children &&
												addChild(
													n.children as BuilderComponent[],
												)
											)
												return true;
										}
										return false;
									};
									if (addChild(working)) {
										setCurrentPage({
											...currentPage,
											content: working,
										});
									}
								}
							}}
						>
							Add container
						</ContextMenuItem>
					</>
				)}
				<HeaderFooterContextItem node={node} type={type} />
				<ContextMenuItem
					className={"text-destructive"}
					onClick={() => {
						if (type === "header") {
							headerEditor.deleteComponent(node.id);
						} else {
							confirmDelete(node.id, parentId, node.type);
						}
					}}
				>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
