import { Play, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useBuilderShortcuts } from "@/builder/hooks/useBuilderShortcuts";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/builder/types/components/components";
import { componentsList } from "@/builder/types/components/ui/componentsList";
import { Button } from "@/components/ui/button";
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
				{/* Render header if any */}
				{headerComponents.length > 0 && (
					<ComponentRendering
						content={headerComponents}
						isRoot
						setTargetComponent={setTargetComponent}
						targetComponent={targetComponent}
					/>
				)}

				{/* Render components for this breakpoint */}
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
		</div>
	);
}
