import { Play, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useBuilderShortcuts } from "@/builder/hooks/useBuilderShortcuts";
import { ComponentRenderer } from "@/builder/lib/renderers/ComponentRenderer";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { useCurrentPageHeaderStore } from "@/builder/store/storeCurrentPageHeader";
import {
	BuilderComponent,
	canHaveChildren,
} from "@/builder/types/components/components";
import { componentsList } from "@/builder/types/components/ui/componentsList";
import { Button } from "@/components/ui/button";
import { usePageFooter } from "@/feature/page/queries/usePageFooter";

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
	const { currentPageHeader } = useCurrentPageHeaderStore();
	// const {data: pageHeader} = usePageHeader(currentPage.id);
	const { data: pageFooter } = usePageFooter(currentPage.id);
	const [targetComponent, setTargetComponent] = useState<string | null>(null);
	useBuilderShortcuts();

	return (
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
					<span>Breakpoint</span>
					<Button
						className={
							"text-foreground bg-muted hover:text-background"
						}
						onClick={() => {
							handleAddBreakpoint();
						}}
					>
						<Plus className="w-4 h-4" />
					</Button>
					<Button
						className={
							"text-destructive bg-muted hover:bg-destructive hover:text-white"
						}
						onClick={() => {
							handleRemoveBreakpoint(bp.name);
						}}
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{/* Viewport */}
			<div
				className={`bg-white rounded-md border overflow-hidden shadow-md`}
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
							label: listDef?.label || componentData.label,
							// Root level components get order based on their position in the current content
							order: currentContent.length + 1,
							// Use defaults from componentsList entry (listDef) and override with any provided data
							props: {
								content: listDef?.props?.content || {},
								style: listDef?.props?.style || {},
							},
							type: componentData.type,
						};

						// If dropping onto a container component, add as a child
						if (targetComponent) {
							// Find the target component in the content array
							const findAndAddChild = (
								components: BuilderComponent[],
							) => {
								for (let i = 0; i < components.length; i++) {
									if (components[i].id === targetComponent) {
										// Initialize children array if it doesn't exist
										if (!components[i].children) {
											components[i].children = [];
										}
										// Add the new component as a child
										components[i].children?.push({
											...newComponent,
											order:
												(components[i].children
													?.length || 0) + 1, // Set order based on position in children array
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
								currentContent.push(newComponent);
							}
						} else {
							// Add to root level
							currentContent.push(newComponent);
						}

						// Update the current page with the new content
						const updatedPage = {
							...currentPage,
							content: currentContent,
						};
						setCurrentPage(updatedPage);

						setTargetComponent(null);
					} catch (error) {
						console.error("Error dropping component:", error);
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
				{/* Render header if exists */}
				{currentPageHeader?.content && (
					<ComponentRenderer
						component={
							currentPageHeader.content as BuilderComponent
						}
						isDropTarget={
							targetComponent ===
							(currentPageHeader.content as BuilderComponent).id
						}
						onDragLeave={() => {
							setTargetComponent(null);
						}}
						onDragOver={(e) => {
							const headerComp =
								currentPageHeader.content as BuilderComponent;
							if (canHaveChildren(headerComp.type)) {
								e.stopPropagation();
								e.preventDefault();
								setTargetComponent(headerComp.id);
							}
						}}
					/>
				)}
				{/* Render components for this breakpoint */}
				{currentPage.content &&
					Array.isArray(currentPage.content) &&
					(currentPage.content as unknown as BuilderComponent[])
						.slice() // Create a copy of the array to avoid mutating the original
						.sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order
						.map((component) => (
							<div key={component.id}>
								<ComponentRenderer
									component={component}
									isDropTarget={
										targetComponent === component.id
									}
									onDragLeave={() => {
										setTargetComponent(null);
									}}
									onDragOver={(e) => {
										// Only allow dropping onto container components
										if (canHaveChildren(component.type)) {
											e.stopPropagation();
											e.preventDefault();
											setTargetComponent(component.id);
										}
									}}
								/>
							</div>
						))}

				{/* Render footer if exists */}
				{pageFooter?.content && (
					<div className={"mt-auto"}>
						<ComponentRenderer
							component={pageFooter.content as BuilderComponent}
							isDropTarget={
								targetComponent ===
								(pageFooter.content as BuilderComponent).id
							}
							onDragLeave={() => {
								setTargetComponent(null);
							}}
							onDragOver={(e) => {
								const footerComp =
									pageFooter.content as BuilderComponent;
								if (canHaveChildren(footerComp.type)) {
									e.stopPropagation();
									e.preventDefault();
									setTargetComponent(footerComp.id);
								}
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
