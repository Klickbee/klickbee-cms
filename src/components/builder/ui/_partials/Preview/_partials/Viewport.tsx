import { JsonValue } from "@prisma/client/runtime/library";
import { Play, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { ComponentRenderer } from "@/builder/lib/renderers/ComponentRenderer";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import {
	BaseComponent,
	Component,
	canHaveChildren,
} from "@/builder/types/components/component";
import { Button } from "@/components/ui/button";

export default function BuilderPreviewViewport({
	bp,
	content,
	handleAddBreakpoint,
	handleRemoveBreakpoint,
}: {
	bp: { name: string; width: number };
	content: JsonValue | null;
	handleAddBreakpoint: () => void;
	handleRemoveBreakpoint: (breakpointName: string) => void;
}) {
	const { currentPage, setCurrentPage } = useCurrentPageStore();
	const [isDragOver, setIsDragOver] = useState(false);
	const [targetComponent, setTargetComponent] = useState<string | null>(null);

	return (
		<div className="flex flex-col gap-2" key={bp.name}>
			{/* Header */}
			<div className="flex items-center justify-between bg-white rounded-md border px-3 py-2 text-sm shadow-sm">
				<div className="flex items-center gap-2 font-medium">
					<Play className="w-4 h-4 text-muted-foreground" />
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
				className={`bg-white rounded-md border overflow-hidden shadow-md ${isDragOver ? "ring-2 ring-blue-500" : ""}`}
				onDragLeave={() => {
					setIsDragOver(false);
				}}
				onDragOver={(e) => {
					e.preventDefault();
					e.dataTransfer.dropEffect = "copy";
					setIsDragOver(true);
				}}
				onDrop={(e) => {
					e.preventDefault();
					setIsDragOver(false);
					try {
						const componentData = JSON.parse(
							e.dataTransfer.getData("application/json"),
						);

						// Create a new content object based on the current content
						const newContent: Record<string, Component[]> = {
							...((currentPage.content as unknown as Record<
								string,
								Component[]
							>) || {}),
						};

						// Initialize the breakpoint array if it doesn't exist
						if (!newContent[bp.name]) {
							newContent[bp.name] = [];
						}

						// Create the new component
						const newComponent = {
							groupId: componentData.groupId,
							id: `${componentData.type}-${Date.now()}`, // Generate a unique ID
							label: componentData.label,
							// Add position based on drop coordinates
							position: {
								x: e.nativeEvent.offsetX,
								y: e.nativeEvent.offsetY,
							},
							type: componentData.type,
						};

						// If dropping onto a container component, add as a child
						if (targetComponent) {
							// Find the target component in the breakpoint array
							const findAndAddChild = (
								components: Component[],
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
											position: undefined, // Remove position for children
										});
										return true;
									}
									// Recursively check children
									if (
										components[i].children &&
										findAndAddChild(
											components[i]
												.children as BaseComponent[],
										)
									) {
										return true;
									}
								}
								return false;
							};

							// Try to add as a child, if not found add to root
							if (!findAndAddChild(newContent[bp.name])) {
								newContent[bp.name].push(newComponent);
							}
						} else {
							// Add to root level
							newContent[bp.name].push(newComponent);
						}

						// Update the current page with the new content
						const updatedPage = {
							...currentPage,
							content: newContent as unknown as JsonValue,
						};
						setCurrentPage(updatedPage);
						setTargetComponent(null);
					} catch (error) {
						console.error("Error dropping component:", error);
					}
				}}
				style={{
					backgroundColor: isDragOver ? "#f0f9ff" : "white",
					height: "1000px",
					position: "relative",
					transition: "all 0.2s ease",
					width: `${bp.width / 1.5}px`,
				}}
			>
				{/* Render components for this breakpoint */}
				{currentPage.content &&
					(
						currentPage.content as unknown as Record<
							string,
							Component[]
						>
					)[bp.name] &&
					(
						currentPage.content as unknown as Record<
							string,
							Component[]
						>
					)[bp.name].map((component) => (
						<div
							key={component.id}
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
						>
							<ComponentRenderer component={component} />
						</div>
					))}
			</div>
		</div>
	);
}
