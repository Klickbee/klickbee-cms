"use client";

import {
	Box,
	ChevronDown,
	ChevronRight,
	GalleryVertical,
	Heading,
	Image,
	FormInputIcon as InputIcon,
	LayoutGrid,
	Mail,
	Minus,
	MoveVertical,
	Text,
	Video,
} from "lucide-react";
import { useState } from "react";
import BuilderSearchComponent from "@/components/builder/ui/_partials/Sidebars/Left/Search";
import BuilderTabContent from "@/components/builder/ui/_partials/Sidebars/Left/TabContent";

type ComponentItem = {
	id: string;
	label: string;
	icon: React.ReactNode;
};

type ComponentGroup = {
	id: string;
	label: string;
	items: ComponentItem[];
};

const groups: ComponentGroup[] = [
	{
		id: "layout",
		items: [
			{
				icon: <GalleryVertical size={16} />,
				id: "section",
				label: "Section",
			},
			{ icon: <Box size={16} />, id: "container", label: "Container" },
			{
				icon: <LayoutGrid size={16} />,
				id: "grid",
				label: "Grid/Column",
			},
			{ icon: <MoveVertical size={16} />, id: "spacer", label: "Spacer" },
			{ icon: <Minus size={16} />, id: "divider", label: "Divider" },
		],
		label: "Layout",
	},
	{
		id: "text",
		items: [
			{ icon: <Heading size={16} />, id: "heading", label: "Heading" },
			{ icon: <Text size={16} />, id: "text", label: "Text" },
		],
		label: "Text & Content",
	},
	{
		id: "media",
		items: [
			{ icon: <Image size={16} />, id: "image", label: "Image" },
			{ icon: <Video size={16} />, id: "video", label: "Video" },
		],
		label: "Media",
	},
	{
		id: "form",
		items: [
			{ icon: <InputIcon size={16} />, id: "input", label: "Input" },
			{ icon: <Mail size={16} />, id: "email", label: "Email" },
		],
		label: "Form",
	},
];

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
										key={item.id}
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
