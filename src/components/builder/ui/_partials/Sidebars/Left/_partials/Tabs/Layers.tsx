import {
	Box,
	ChevronDown,
	ChevronRight,
	GalleryVertical,
	Heading,
	Search,
} from "lucide-react";
import { useState } from "react";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { cn } from "@/lib/utils";

type Node = {
	content: NodeContent[];
};

type NodeContent = {
	id: string;
	type: "section" | "container" | "title";
	label: string;
	icon: React.ReactNode;
	children?: NodeContent[];
};

const mockTree: Node[] = [
	{
		content: [
			{
				children: [
					{
						children: [
							{
								icon: <Heading size={16} />,
								id: "title-1",
								label: "Title",
								type: "title",
							},
						],
						icon: <Box size={16} />,
						id: "container-1",
						label: "Container",
						type: "container",
					},
				],
				icon: <GalleryVertical size={16} />,
				id: "section-1",
				label: "Section",
				type: "section",
			},
			{
				children: [
					{
						children: [
							{
								icon: <Heading size={16} />,
								id: "title-2",
								label: "Title",
								type: "title",
							},
						],
						icon: <Box size={16} />,
						id: "container-2",
						label: "Container",
						type: "container",
					},
				],
				icon: <GalleryVertical size={16} />,
				id: "section-2",
				label: "Section",
				type: "section",
			},
		],
	},
];

function TreeNode({ node, level = 0 }: { node: NodeContent; level?: number }) {
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
				node.children?.map((child) => (
					<TreeNode key={child.id} level={level + 1} node={child} />
				))}
		</div>
	);
}

export default function BuilderTabLayers() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);

	return (
		<div className="flex flex-col gap-2 px-4 py-2 text-sm">
			{/* Page name */}
			<div className="text-blue-600 font-medium pt-2">
				{currentPage.title}
			</div>

			{/* Tree */}
			<div>
				{mockTree.flatMap((node) =>
					node.content.map((contentNode) => (
						<TreeNode key={contentNode.id} node={contentNode} />
					)),
				)}
			</div>
		</div>
	);
}
