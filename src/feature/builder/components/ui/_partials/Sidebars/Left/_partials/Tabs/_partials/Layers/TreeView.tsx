import React from "react";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import HeaderFooterContextItem from "@/feature/builder/components/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Layers/_partials/HeaderFooterContextItem";
import { useDeleteComponentContext } from "@/feature/builder/contexts/DeleteComponentContext";
import { useDuplicateComponent } from "@/feature/builder/hooks/useDuplicateComponent";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { useStyleClipboardStore } from "@/feature/builder/store/storeStyleClipboard";
import { ComponentName } from "@/feature/builder/types/components/componentMap";
import {
	BuilderComponent,
	canHaveChildren,
} from "@/feature/builder/types/components/components";
import { componentsList } from "@/feature/builder/types/components/ui/componentsList";
import { useFooterEditor } from "@/feature/page/_footer/hooks/useFooterEditor";
import { useHeaderEditor } from "@/feature/page/_header/hooks/useHeaderEditor";
import { TreeNode } from "./TreeNode";

interface TreeViewProps {
	contentNodes: BuilderComponent[];
	type?: "header" | "footer" | "content";
	rootExpand?: boolean;
}

export function TreeView({
	contentNodes,
	type,
	rootExpand = true,
}: TreeViewProps) {
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
									rootExpand={rootExpand}
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
									Copy style (Ctrl+Shift+C)
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
									Paste style (Ctrl+Shift+V)
								</ContextMenuItem>
								{/* Add child actions for parent components at root level */}
								{canHaveChildren(contentNode.type) && (
									<>
										<ContextMenuItem
											onClick={() => {
												const listDef =
													componentsList.find(
														(c) =>
															c.type ===
															"section",
													);
												const newComponent: BuilderComponent =
													{
														name: listDef?.name as ComponentName,
														groupId:
															(listDef?.groupId as string) ||
															"layout",
														id: `section-${Date.now()}`,
														label:
															listDef?.label ||
															"Section",
														order:
															(contentNode
																.children
																?.length ?? 0) +
															1,
														props: {
															content:
																listDef?.props
																	?.content ||
																{},
															style:
																listDef?.props
																	?.style ||
																{},
														},
														type: "section",
													};
												if (type === "header") {
													headerEditor.addComponent(
														newComponent,
														contentNode.id,
													);
												} else if (type === "footer") {
													footerEditor.addComponent(
														newComponent,
														contentNode.id,
													);
												} else {
													const working =
														Array.isArray(
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
															if (
																n.id ===
																contentNode.id
															) {
																if (!n.children)
																	n.children =
																		[];
																(
																	n.children as BuilderComponent[]
																).push(
																	newComponent,
																);
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
												const listDef =
													componentsList.find(
														(c) =>
															c.type ===
															"container",
													);
												const newComponent: BuilderComponent =
													{
														name: listDef?.name as ComponentName,
														groupId:
															(listDef?.groupId as string) ||
															"layout",
														id: `container-${Date.now()}`,
														label:
															listDef?.label ||
															"Container",
														order:
															(contentNode
																.children
																?.length ?? 0) +
															1,
														props: {
															content:
																listDef?.props
																	?.content ||
																{},
															style:
																listDef?.props
																	?.style ||
																{},
														},
														type: "container",
													};
												if (type === "header") {
													headerEditor.addComponent(
														newComponent,
														contentNode.id,
													);
												} else if (type === "footer") {
													footerEditor.addComponent(
														newComponent,
														contentNode.id,
													);
												} else {
													const working =
														Array.isArray(
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
															if (
																n.id ===
																contentNode.id
															) {
																if (!n.children)
																	n.children =
																		[];
																(
																	n.children as BuilderComponent[]
																).push(
																	newComponent,
																);
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
								<HeaderFooterContextItem
									node={contentNode}
									type={type}
								/>
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
