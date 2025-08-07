import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ComponentItem } from "@/builder/definitions/componentsList";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { cn } from "@/lib/utils";

interface TreeNodeProps {
	node: ComponentItem;
	level?: number;
}

export function TreeNode({ node, level = 0 }: TreeNodeProps) {
	const [expanded, setExpanded] = useState(true);
	const setCurrentComponent = useCurrentComponentStore(
		(state) => state.setCurrentComponent,
	);
	const hasChildren = node.children && node.children.length > 0;
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);

	const isCurrentComponent = (id: string) => {
		return currentComponent.id === id;
	};

	return (
		<div className="ml-2 py-0.5">
			<div
				className={cn(
					"flex items-center gap-1 py-1.5 px-0.5 cursor-pointer text-sm text-primary hover:text-background hover:bg-foreground rounded-md",
					level > 0 && "pl-4",
					isCurrentComponent(node.id)
						? "bg-foreground text-background"
						: "",
				)}
				onClick={() => {
					setExpanded(
						!isCurrentComponent(node.id) ? true : !expanded,
					);
					setCurrentComponent(node);
				}}
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
