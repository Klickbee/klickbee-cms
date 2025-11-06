"use client";

import { DragOverlay } from "@dnd-kit/core";
import { ChevronDown, ChevronUp, ComponentIcon } from "lucide-react";
import { useState } from "react";
import BuilderSearchComponent from "@/feature/builder/components/ui/_partials/Sidebars/Left/Search";
import { useCurrentComponentStore } from "@/feature/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import {
	BuilderComponent,
	isParentComponent,
} from "@/feature/builder/types/components/components";
import { componentsList } from "@/feature/builder/types/components/ui/componentsList";
import { useFooterEditor } from "@/feature/page/_footer/hooks/useFooterEditor";
import { useHeaderEditor } from "@/feature/page/_header/hooks/useHeaderEditor";

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

	const [activeId, setActiveId] = useState<string>("");

	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);
	const pageId =
		currentPage?.id && currentPage.id > 0 ? currentPage.id : undefined;
	const headerEditor = useHeaderEditor(pageId);
	const footerEditor = useFooterEditor(pageId);

	const toggleGroup = (id: string) => {
		setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	function handleAddComponent(e: unknown, item: BuilderComponent) {
		try {
			const componentData = item;
			// Get the current content as an array or initialize a new one
			const currentContent = Array.isArray(currentPage.content)
				? [...currentPage.content]
				: [];

			// Create the new component using the selected item from componentsList
			const newComponent: BuilderComponent = {
				name: componentData.name,
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

			// If a component is selected, try to add as a child of the selection
			if (currentComponent && currentComponent.id !== "none") {
				// If selected component belongs to header, delegate to header editor
				if (headerEditor.containsNode(currentComponent.id)) {
					headerEditor.addComponent(
						newComponent,
						currentComponent.id,
					);
					return;
				}
				// If selected component belongs to footer, delegate to footer editor
				if (footerEditor.containsNode(currentComponent.id)) {
					footerEditor.addComponent(
						newComponent,
						currentComponent.id,
					);
					return;
				}

				// Otherwise, operate on page body content
				const findAndAddChild = (components: BuilderComponent[]) => {
					for (let i = 0; i < components.length; i++) {
						if (components[i].id === currentComponent.id) {
							if (!components[i].children) {
								components[i].children = [];
							}
							if (isParentComponent(components[i])) {
								components[i].children?.push({
									...newComponent,
									order:
										(components[i].children?.length || 0) +
										1,
								});
								return true;
							}
							return false;
						}
						if (
							components[i].children &&
							findAndAddChild(
								components[i].children as BuilderComponent[],
							)
						) {
							return true;
						}
					}
					return false;
				};

				if (!findAndAddChild(currentContent)) {
					currentContent.push(newComponent);
				}
			} else {
				// No selection: add to root level of page body
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
									<>
										<div
											className="border-l flex items-center gap-2 pl-6 py-1 text-primary hover:text-background hover:bg-foreground rounded-md cursor-pointer"
											draggable
											key={item.id}
											onClick={(e) =>
												handleAddComponent(e, item)
											}
											onDragStart={(e) => {
												setActiveId(item.id);
												const componentData = {
													groupId: group.id,
													label: item.label,
													name: item.name,
													type: item.type, // use type from componentsList
												};
												e.dataTransfer.setData(
													"application/json",
													JSON.stringify(
														componentData,
													),
												);
												e.dataTransfer.effectAllowed =
													"copy";
											}}
										>
											{item.icon}
											<span>{item.label}</span>
										</div>
										<DragOverlay>
											{activeId === item.id ? (
												<div>
													{item.icon}
													<span>{item.label}</span>
												</div>
											) : null}
										</DragOverlay>
									</>
								))}
						</div>
					);
				})}
			</div>
		</>
	);
}
