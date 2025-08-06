import { Box, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
	ComponentItem,
	componentsList,
} from "@/builder/definitions/componentsList";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { cn } from "@/lib/utils";

function TreeNode({
	node,
	level = 0,
}: {
	node: ComponentItem;
	level?: number;
}) {
	const [expanded, setExpanded] = useState(true);
	const hasChildren = node.children && node.children.length > 0;

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
				{node.icon}
				<span className="ml-2">{node.label}</span>
			</div>
			{expanded &&
				node.children?.map((child: ComponentItem) => (
					<TreeNode key={child.id} level={level + 1} node={child} />
				))}
		</div>
	);
}

export default function BuilderTabLayers() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);

	const mapContentToTree = (content: ComponentItem[]): ComponentItem[] => {
		return content.map((component) => {
			const base = componentsList.find(
				(c) => c.id === component.group,
			) || {
				group: component.group || "",
				icon: <Box size={16} />,
				id: component.id,
				label: component.label || component.group,
			};
			return {
				...base,
				children: component.children
					? mapContentToTree(component.children)
					: [],
				id: component.id,
				label: component.label || base.label,
			};
		});
	};

	const contentNodes: ComponentItem[] =
		currentPage.content && Array.isArray(currentPage.content)
			? mapContentToTree(currentPage.content as ComponentItem[])
			: [];

	return (
		<div className="flex flex-col gap-2 px-4 py-2 text-sm">
			{/* Page name */}
			<div className="text-blue-600 font-medium pt-2">
				{currentPage.title}
			</div>

			{/* Tree */}
			<div>
				{contentNodes.length > 0 ? (
					contentNodes.map((contentNode: ComponentItem) => (
						<TreeNode key={contentNode.id} node={contentNode} />
					))
				) : (
					<div className="text-muted-foreground text-sm py-2">
						No components added yet
					</div>
				)}
			</div>
		</div>
	);
}
