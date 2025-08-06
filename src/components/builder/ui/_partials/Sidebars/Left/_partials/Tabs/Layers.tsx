import {
	Box,
	ChevronDown,
	ChevronRight,
	FormInputIcon,
	GalleryVertical,
	Heading as HeadingIcon,
	Image as ImageIcon,
	LayoutGrid,
	Mail,
	Minus,
	MoveVertical,
	Text as TextIcon,
	Video,
} from "lucide-react";
import { useState } from "react";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { Breakpoint } from "@/builder/types/breakpoint";
import { Component, ComponentType } from "@/builder/types/components/component";
import { useSetting } from "@/feature/settings/queries/useSettings";
import { cn } from "@/lib/utils";

// Map component types to icons
const componentIcons: Record<ComponentType, React.ReactNode> = {
	container: <Box size={16} />,
	divider: <Minus size={16} />,
	email: <Mail size={16} />,
	grid: <LayoutGrid size={16} />,
	heading: <HeadingIcon size={16} />,
	image: <ImageIcon size={16} />,
	input: <FormInputIcon size={16} />,
	section: <GalleryVertical size={16} />,
	spacer: <MoveVertical size={16} />,
	text: <TextIcon size={16} />,
	video: <Video size={16} />,
};

function TreeNode({
	component,
	level = 0,
	breakpoint,
}: {
	component: Component;
	level?: number;
	breakpoint: string;
}) {
	const [expanded, setExpanded] = useState(true);
	const hasChildren = component.children && component.children.length > 0;
	const icon = componentIcons[component.type] || <Box size={16} />;

	return (
		<div className="ml-2">
			<div
				className={cn(
					"flex items-center gap-1 py-1.5 cursor-pointer text-sm text-muted-foreground",
					level > 0 && "pl-4",
				)}
				onClick={() => hasChildren && setExpanded(!expanded)}
			>
				{hasChildren ? (
					expanded ? (
						<ChevronDown className="w-4 h-4" />
					) : (
						<ChevronRight className="w-4 h-4" />
					)
				) : (
					<span className="w-4 h-4" />
				)}
				{icon}
				<span className="ml-2">{component.label}</span>
				{breakpoint && level === 0 && (
					<span className="ml-2 text-xs text-gray-400">
						({breakpoint})
					</span>
				)}
			</div>
			{expanded &&
				component.children?.map((child) => (
					<TreeNode
						breakpoint={breakpoint}
						component={child}
						key={child.id}
						level={level + 1}
					/>
				))}
		</div>
	);
}

export default function BuilderTabLayers() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);

	// Function to get all components from all breakpoints
	const getAllComponents = () => {
		if (!currentPage.content) return [];

		const result: { component: Component; breakpoint: string }[] = [];

		// For each breakpoint, get all components
		Object.keys(
			currentPage.content as unknown as Record<string, Component[]>,
		).forEach((breakpointName) => {
			const components = (
				currentPage.content as unknown as Record<string, Component[]>
			)[breakpointName];
			if (Array.isArray(components)) {
				components.forEach((component) => {
					result.push({ breakpoint: breakpointName, component });
				});
			}
		});

		return result;
	};

	const allComponents = getAllComponents();

	return (
		<div className="flex flex-col gap-2 px-4 py-2 text-sm">
			{/* Page name */}
			<div className="text-blue-600 font-medium pt-2">
				{currentPage.title || "Untitled Page"}
			</div>

			{/* Tree */}
			<div>
				{allComponents.length > 0 ? (
					allComponents.map(({ component, breakpoint }) => (
						<TreeNode
							breakpoint={breakpoint}
							component={component}
							key={`${breakpoint}-${component.id}`}
						/>
					))
				) : (
					<div className="text-muted-foreground py-2">
						No components added yet. Drag components from the
						Components tab to add them to the page.
					</div>
				)}
			</div>
		</div>
	);
}
