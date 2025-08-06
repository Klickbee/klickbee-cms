"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
	ComponentItem,
	componentsList,
} from "@/builder/definitions/componentsList";
import BuilderSearchComponent from "@/components/builder/ui/_partials/Sidebars/Left/Search";

type ComponentGroup = {
	id: string;
	label: string;
	items: ComponentItem[];
};

const groupLabels: Record<string, string> = {
	form: "Form",
	layout: "Layout",
	media: "Media",
	text: "Text",
};

const groups: ComponentGroup[] = Object.entries(groupLabels).map(
	([groupId, label]) => ({
		id: groupId,
		items: componentsList.filter((c) => c.group === groupId),
		label,
	}),
);

export default function BuilderTabComponents() {
	const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
		layout: true,
	});

	const toggleGroup = (id: string) => {
		setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
	};

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
								<span
									className={
										isOpen && group.id === "layout"
											? "text-blue-600"
											: "text-muted-foreground"
									}
								>
									{group.label}
								</span>
								{isOpen ? (
									<ChevronDown className="w-4 h-4 text-muted-foreground" />
								) : (
									<ChevronRight className="w-4 h-4 text-muted-foreground" />
								)}
							</div>

							{/* Items */}
							{isOpen &&
								group.items.map((item) => (
									<div
										className="flex items-center gap-2 pl-6 py-1 text-muted-foreground hover:text-foreground cursor-pointer"
										draggable
										key={item.id}
										onDragStart={(e) => {
											const componentData = {
												groupId: group.id,
												label: item.label,
												type: item.id,
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
