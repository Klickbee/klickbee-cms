"use client";

import { Ellipsis, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DragDropContext } from "@/feature/builder/components/_partials/DragAndDropContext";
import { BreakpointProvider } from "@/feature/builder/contexts/BreakpointContext";
import { useBuilderShortcuts } from "@/feature/builder/hooks/useBuilderShortcuts";
import { useCssGeneration } from "@/feature/builder/hooks/useCssGeneration";
import { isBreakpointStyleProps } from "@/feature/builder/lib/style/breakpointStyle";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { BreakpointStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";
import { componentsList } from "@/feature/builder/types/components/ui/componentsList";
import { useFooterEditor } from "@/feature/page/_footer/hooks/useFooterEditor";
import { usePageFooterByPage } from "@/feature/page/_footer/queries/usePageFooter";
import { useHeaderEditor } from "@/feature/page/_header/hooks/useHeaderEditor";
import { usePageHeaderByPage } from "@/feature/page/_header/queries/usePageHeader";
import ComponentRendering from "./ComponentRendering";

export default function BuilderPreviewViewport({
	bp,
	handleAddBreakpoint,
	handleRemoveBreakpoint,
}: {
	bp: { name: string; width: number };
	handleAddBreakpoint: () => void;
	handleRemoveBreakpoint: (breakpointName: string) => void;
}) {
	const { currentPage, setCurrentPage } = useCurrentPageStore();
	const [targetComponent, setTargetComponent] = useState<string | null>(null);
	useBuilderShortcuts();
	useCssGeneration();

	// Load and prepare page header components
	const pageId =
		currentPage?.id && currentPage.id > 0 ? currentPage.id : undefined;
	const { data: pageHeader } = usePageHeaderByPage(pageId);
	const headerComponents: BuilderComponent[] = Array.isArray(
		pageHeader?.content,
	)
		? (pageHeader?.content as BuilderComponent[])
		: pageHeader?.content
			? ([pageHeader.content] as BuilderComponent[])
			: [];

	// Load and prepare page footer components
	const { data: pageFooter } = usePageFooterByPage(pageId);
	const footerComponents: BuilderComponent[] = Array.isArray(
		pageFooter?.content,
	)
		? (pageFooter?.content as BuilderComponent[])
		: pageFooter?.content
			? ([pageFooter.content] as BuilderComponent[])
			: [];

	const headerEditor = useHeaderEditor(pageId);
	const footerEditor = useFooterEditor(pageId);

	function isInTree(list: BuilderComponent[], id: string): boolean {
		for (const n of list) {
			if (n.id === id) return true;
			if (n.children && isInTree(n.children as BuilderComponent[], id))
				return true;
		}
		return false;
	}

	// console.log(currentPage.content)
	// console.log(headerComponents)

	return (
		<BreakpointProvider value={bp}>
			<DragDropContext.Provider
				value={{
					targetComponent,
					setTargetComponent,
					sourceComponent: null,
					setSourceComponent: () => {
						/* noop */
					},
					reorderComponents: () => {
						/* noop */
					},
				}}
			>
				<div className="flex flex-col gap-2" key={bp.name}>
					{/* Header */}
					<div className="flex items-center justify-between bg-white rounded-md border px-3 py-2 text-sm shadow-sm">
						<div className="flex items-center gap-2 font-medium">
							<Button className={"bg-foreground text-background"}>
								<Play className="w-4 h-4" />
							</Button>
							{bp.name}
							<span className="text-muted-foreground ml-2 text-xs">
								{bp.width}
							</span>
						</div>
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Ellipsis />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>
										Breakpoints
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => {
											handleAddBreakpoint();
										}}
									>
										Add
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => {
											handleRemoveBreakpoint(bp.name);
										}}
									>
										Remove
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>

					{/* Viewport */}
					<div
						className={`bg-white rounded-md border overflow-hidden shadow-md`}
						data-builder="true"
						onClickCapture={(e) => {
							// In builder: disable navigation and show a toast with the link
							const target = e.target as HTMLElement | null;
							if (!target) return;
							let href: string | null = null;
							// Prefer nearest anchor tag
							const anchor = target.closest(
								"a",
							) as HTMLAnchorElement | null;
							if (anchor) {
								href =
									anchor.getAttribute("href") ||
									anchor.href ||
									"";
							} else {
								// Fallback for elements like builder Button that may carry data-href
								const dataLinkEl = target.closest(
									"[data-href]",
								) as HTMLElement | null;
								if (dataLinkEl) {
									href = dataLinkEl.getAttribute("data-href");
								}
							}
							if (href && typeof href === "string") {
								e.preventDefault();
								toast(`link : ${href}`);
							}
						}}
						onDragOver={(e) => {
							e.preventDefault();
							e.dataTransfer.dropEffect = "copy";
						}}
						onDrop={(e) => {
							e.preventDefault();
							try {
								const componentData = JSON.parse(
									e.dataTransfer.getData("application/json"),
								);

								// Get the current content as an array or initialize a new one
								const currentContent = Array.isArray(
									currentPage.content,
								)
									? [...currentPage.content]
									: [];

								// Create the new component using componentsList definition
								const listDef = componentsList.find(
									(c) => c.type === componentData.type,
								);

								const newComponent = {
									groupId:
										(listDef?.groupId as string) ||
										componentData.groupId,
									id: `${componentData.type}-${Date.now()}`, // Generate a unique ID
									name: componentData.name,
									label:
										listDef?.label || componentData.label,
									// Root level components get order based on their position in the current content
									order: currentContent.length + 1,
									// Use defaults from componentsList entry (listDef) and override with any provided data
									props: {
										content: listDef?.props?.content || {},
										style: isBreakpointStyleProps(
											listDef?.props?.style,
										)
											? (listDef?.props
													?.style as BreakpointStyleProps)
											: {
													[bp.width]:
														listDef?.props?.style ||
														{},
												},
									},
									type: componentData.type,
								};

								// Header region drop? If target belongs to header tree, delegate to header editor
								if (
									targetComponent &&
									isInTree(headerComponents, targetComponent)
								) {
									headerEditor.addComponent(
										newComponent as BuilderComponent,
										targetComponent,
									);
									setTargetComponent(null);
									return;
								}
								// Footer region drop? If target belongs to footer tree, delegate to footer editor
								if (
									targetComponent &&
									isInTree(footerComponents, targetComponent)
								) {
									footerEditor.addComponent(
										newComponent as BuilderComponent,
										targetComponent,
									);
									setTargetComponent(null);
									return;
								}

								// If dropping onto a container component in body, add as a child
								if (targetComponent) {
									// Find the target component in the content array
									const findAndAddChild = (
										components: BuilderComponent[],
									) => {
										for (
											let i = 0;
											i < components.length;
											i++
										) {
											if (
												components[i].id ===
												targetComponent
											) {
												// Initialize children array if it doesn't exist
												if (!components[i].children) {
													components[i].children = [];
												}
												// Add the new component as a child
												components[i].children?.push({
													...newComponent,
													order:
														(components[i].children
															?.length || 0) + 1,
												});
												return true;
											}
											// Recursively check children
											if (
												components[i].children &&
												findAndAddChild(
													components[i]
														.children as BuilderComponent[],
												)
											) {
												return true;
											}
										}
										return false;
									};

									// Try to add as a child, if not found add to root
									if (!findAndAddChild(currentContent)) {
										currentContent.push(
											newComponent as BuilderComponent,
										);
									}
								} else {
									// Add to root body level
									currentContent.push(
										newComponent as BuilderComponent,
									);
								}

								// Update the current page with the new content
								const updatedPage = {
									...currentPage,
									content: currentContent,
								};
								setCurrentPage(updatedPage);

								setTargetComponent(null);
							} catch (error) {
								console.error(
									"Error dropping component:",
									error,
								);
							}
						}}
						style={{
							backgroundColor: "white",
							containerType: "inline-size",
							display: "flex",
							flexDirection: "column",
							minHeight: "100vh",
							position: "relative",
							transition: "all 0.2s ease",
							width: `${bp.width}px`,
						}}
					>
						<div
							style={{
								transformOrigin: "top left",
								width: `${bp.width}px`,
							}}
						></div>
						{/* Render header if any */}
						{headerComponents.length > 0 && (
							<ComponentRendering
								content={headerComponents}
								isRoot
								region="header"
								setTargetComponent={setTargetComponent}
								targetComponent={targetComponent}
							/>
						)}

						{/* Render components for this breakpoint */}
						<div className="flex-1 flex flex-col">
							{Array.isArray(currentPage.content) && (
								<ComponentRendering
									content={
										currentPage.content as unknown as BuilderComponent[]
									}
									isRoot
									setTargetComponent={setTargetComponent}
									targetComponent={targetComponent}
								/>
							)}
						</div>

						{/* Render footer if any */}
						{footerComponents.length > 0 && (
							<ComponentRendering
								content={footerComponents}
								isRoot
								region="footer"
								setTargetComponent={setTargetComponent}
								targetComponent={targetComponent}
							/>
						)}
					</div>
				</div>
			</DragDropContext.Provider>
		</BreakpointProvider>
	);
}
