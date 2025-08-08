"use client";

import { JsonValue } from "@prisma/client/runtime/library";
import {
	ChevronDown,
	ChevronRight,
	ChevronUp,
	ComponentIcon,
} from "lucide-react";
import { useState } from "react";
import { componentsList } from "@/builder/definitions/componentsList";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import {
	BaseComponent,
	BuilderComponent,
} from "@/builder/types/components/component";
import { componentMap } from "@/builder/types/components/componentMap";
import BuilderSearchComponent from "@/components/builder/ui/_partials/Sidebars/Left/Search";

type ComponentGroup = {
	id: string;
	label: string;
	items: BaseComponent[];
};

const groupLabels: Record<string, string> = {
	form: "Form",
	layout: "Layout",
	media: "Media",
	text: "Text & Content",
};

const groups: ComponentGroup[] = Object.entries(groupLabels).map(
	([groupId, label]) => ({
		id: groupId,
		items: componentsList.filter((c) => c.groupId === groupId),
		label,
	}),
);

export default function BuilderTabComponents() {
	const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
		layout: true,
	});

	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);

	const toggleGroup = (id: string) => {
		setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	function handleAddComponent(e: unknown, item: BaseComponent) {
		try {
			const componentData = item;
			// Get the current content as an array or initialize a new one
			const currentContent = Array.isArray(currentPage.content)
				? [...currentPage.content]
				: [];

			// Create the new component
			const componentType =
				componentData.type as keyof typeof componentMap;
			const componentDef = componentMap[componentType];

			const newComponent = {
				// Add content and style props from component definition
				contentProps: componentDef
					? { ...componentDef.contentProps }
					: {},
				// Add breakpoint information
				groupId: componentData.groupId,
				id: `${componentData.type}-${Date.now()}`, // Generate a unique ID
				label: componentData.label,
				// Add order based on position in the array
				order: currentContent.length + 1, // Root level components get order based on their position
				styleProps: componentDef ? { ...componentDef.styleProps } : {},
				type: componentData.type,
			};

			// If dropping onto a container component, add as a child
			if (currentComponent) {
				// Find the target component in the content array
				const findAndAddChild = (components: BuilderComponent[]) => {
					for (let i = 0; i < components.length; i++) {
						if (components[i].id === currentComponent.id) {
							// Initialize children array if it doesn't exist
							if (!components[i].children) {
								components[i].children = [];
							}
							// Add the new component as a child
							components[i].children?.push({
								...newComponent,
								order:
									(components[i].children?.length || 0) + 1, // Set order based on position in children array
							});
							return true;
						}
						// Recursively check children
						if (
							components[i].children &&
							findAndAddChild(
								components[i].children as BaseComponent[],
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
			// const updatedPage = {
			// 	...currentPage,
			// 	content: currentContent as unknown as JsonValue,
			// };
			// setCurrentPage(updatedPage);
			// setTargetComponent(null);
		} catch (error) {
			console.error("Error dropping component:", error);
		}
	}

	return (
		<>
			<BuilderSearchComponent />
			<div className="flex flex-col gap-1 px-4 py-2 text-sm">
				{groups.map((group) => {
					const isOpen = openGroups[group.id] ?? false;

					return (
						<div className="flex flex-col" key={group.id}>
							{/* Group title */}
							<div
								className="flex items-center justify-between py-2 font-medium cursor-pointer"
								onClick={() => toggleGroup(group.id)}
							>
								<div
									className={
										"flex flex-row gap-2 items-center"
									}
								>
									<ComponentIcon size={16} />
									<span
										className={
											isOpen
												? "text-primary"
												: "text-muted-foreground"
										}
									>
										{group.label}
									</span>
								</div>
								{isOpen ? (
									<ChevronDown className="w-4 h-4 text-muted-foreground" />
								) : (
									<ChevronUp className="w-4 h-4 text-muted-foreground" />
								)}
							</div>

							{/* Items */}
							{isOpen &&
								group.items.map((item) => (
									<div
										className="border-l flex items-center gap-2 pl-6 py-1 text-primary hover:text-background hover:bg-foreground rounded-md cursor-pointer"
										draggable
										key={item.id}
										onClick={(e) =>
											handleAddComponent(e, item)
										}
										onDragStart={(e) => {
											const componentData = {
												groupId: group.id,
												label: item.label,
												type: item.type, // use type from componentsList
											};
											e.dataTransfer.setData(
												"application/json",
												JSON.stringify(componentData),
											);
											e.dataTransfer.effectAllowed =
												"copy";
										}}
									>
										{item.icon}
										<span>{item.label}</span>
									</div>
								))}
						</div>
					);
				})}
			</div>
		</>
	);
}
