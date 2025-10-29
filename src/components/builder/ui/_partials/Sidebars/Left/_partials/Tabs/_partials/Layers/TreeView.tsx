import React from "react";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { useDuplicateComponent } from "@/builder/hooks/useDuplicateComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { useStyleClipboardStore } from "@/builder/store/storeStyleClipboard";
import { BuilderComponent } from "@/builder/types/components/components";
import HeaderFooterContextItem from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Layers/_partials/HeaderFooterContextItem";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useFooterEditor } from "@/feature/page/_footer/hooks/useFooterEditor";
import { useHeaderEditor } from "@/feature/page/_header/hooks/useHeaderEditor";
import { TreeNode } from "./TreeNode";

interface TreeViewProps {
	contentNodes: BuilderComponent[];
	type?: "header" | "footer" | "content";
}

export function TreeView({ contentNodes, type }: TreeViewProps) {
	const { confirmDelete } = useDeleteComponentContext();
	const { duplicateComponent } = useDuplicateComponent();
	const { clipboard, copy } = useStyleClipboardStore();
	const { currentPage, setCurrentPage } = useCurrentPageStore();
	const pageId =
		currentPage?.id && currentPage.id > 0 ? currentPage.id : undefined;
	const headerEditor = useHeaderEditor(pageId);
	const footerEditor = useFooterEditor(pageId);

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
									type={type}
								/>
							</ContextMenuTrigger>
							<ContextMenuContent>
								<ContextMenuItem
									onClick={() => {
										if (type === "header") {
											headerEditor.duplicateComponent(
												contentNode.id,
											);
											return;
										}
										if (type === "footer") {
											footerEditor.duplicateComponent(
												contentNode.id,
											);
											return;
										}
										duplicateComponent(contentNode.id);
									}}
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
										if (type === "header") {
											headerEditor.pasteStyle(
												contentNode.id,
												clipboard,
											);
											return;
										}
										if (type === "footer") {
											footerEditor.pasteStyle(
												contentNode.id,
												clipboard,
											);
											return;
										}
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
								<HeaderFooterContextItem node={contentNode} />
								<ContextMenuItem
									className={"text-destructive"}
									onClick={() => {
										if (type === "header") {
											headerEditor.deleteComponent(
												contentNode.id,
											);
										} else if (type === "footer") {
											footerEditor.deleteComponent(
												contentNode.id,
											);
										} else {
											confirmDelete(
												contentNode.id,
												null,
												contentNode.type,
											);
										}
									}}
								>
									Delete
								</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>
					))}
				</React.Fragment>
			) : null}
		</div>
	);
}
