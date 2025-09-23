import React from "react";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { useDuplicateComponent } from "@/builder/hooks/useDuplicateComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { useStyleClipboardStore } from "@/builder/store/storeStyleClipboard";
import {
	BuilderComponent,
	isParentComponent,
} from "@/builder/types/components/components";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { EmptyState } from "./EmptyState";
import { TreeNode } from "./TreeNode";

interface TreeViewProps {
	contentNodes: BuilderComponent[];
}

export function TreeView({ contentNodes }: TreeViewProps) {
	const { confirmDelete } = useDeleteComponentContext();
	const { duplicateComponent } = useDuplicateComponent();
	const { clipboard, copy } = useStyleClipboardStore();
	const { currentPage, setCurrentPage } = useCurrentPageStore();

	return (
		<div>
			{contentNodes.length > 0 ? (
				<React.Fragment>
					{contentNodes.map((contentNode: BuilderComponent) => (
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
									onClick={() =>
										duplicateComponent(contentNode.id)
									}
								>
									Duplicate (Ctrl+D)
								</ContextMenuItem>
								<ContextMenuItem
									onClick={() =>
										copy(contentNode.props?.style)
									}
								>
									Copy style
								</ContextMenuItem>
								<ContextMenuItem
									onClick={() => {
										if (!clipboard) return;
										const working = Array.isArray(
											currentPage.content,
										)
											? (JSON.parse(
													JSON.stringify(
														currentPage.content,
													),
												) as BuilderComponent[])
											: [];
										const update = (
											list: BuilderComponent[],
										): boolean => {
											for (const n of list) {
												if (n.id === contentNode.id) {
													n.props = {
														...n.props,
														style: { ...clipboard },
													};
													return true;
												}
												if (
													n.children &&
													update(
														n.children as BuilderComponent[],
													)
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
								{isParentComponent(contentNode) && (
									<>
										<ContextMenuItem>
											{/* TODO : implement set as header*/}
											Set as header
										</ContextMenuItem>
										<ContextMenuItem>
											{/* TODO : implement set as footer*/}
											Set as footer
										</ContextMenuItem>
									</>
								)}
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
				</React.Fragment>
			) : (
				<EmptyState />
			)}
		</div>
	);
}
