"use client";

import { ChevronDown, ChevronUp, ComponentIcon } from "lucide-react";
import { useState } from "react";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import {
	BuilderComponent,
	isParentComponent,
} from "@/builder/types/components/components";
import { componentsList } from "@/builder/types/components/ui/componentsList";
import BuilderSearchComponent from "@/components/builder/ui/_partials/Sidebars/Left/Search";

type ComponentGroup = {
	id: string;
	label: string;
	items: BuilderComponent[];
};

const groupLabels: Record<string, string> = {
	layout: "Layout",
	text: "Text & Content",
	media: "Media",
	form: "Form",
	navigation: "Navigation",
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
	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);
	const _setTargetComponent = useCurrentComponentStore(
		(state) => state.setCurrentComponent,
	);
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);

	const toggleGroup = (id: string) => {
		setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	function handleAddComponent(e: unknown, item: BuilderComponent) {
		try {
			const componentData = item;
			// Get the current content as an array or initialize a new one
			const currentContent = Array.isArray(currentPage.content)
				? currentPage.content
				: [];

			// Create the new component using the selected item from componentsList
			const newComponent: BuilderComponent = {
				groupId: componentData.groupId,
				id: `${componentData.type}-${Date.now()}`, // Generate a unique ID for the instance
				label: componentData.label,
				order: currentContent.length + 1, // Root-level order based on position
				props: {
					content: componentData.props?.content || {},
					style: componentData.props?.style || {},
				},
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
							if (isParentComponent(components[i])) {
								// Add the new component as a child
								components[i].children?.push({
									...newComponent,
									order:
										(components[i].children?.length || 0) +
										1,
								});
								return true;
							} else {
								return false;
							}
						}
						// Recursively check children
						if (
							components[i].children &&
							findAndAddChild(components[i].children as [])
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
