import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { BaseComponent } from "@/builder/types/components/component";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";

interface TreeNodeProps {
	id: string;
	node: BaseComponent;
	level?: number;
	parentId?: string | null;
	isDragging?: boolean;
}

export function TreeNode({ node, level = 0, parentId = null }: TreeNodeProps) {
	const { confirmDelete } = useDeleteComponentContext();
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
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="ml-2 py-0.5">
					<div
						className={cn(
							"flex items-center gap-1 py-1.5 px-0.5 cursor-pointer text-sm " +
								"text-primary hover:text-background hover:bg-foreground rounded-md",
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
					<div className="ml-4">
						{expanded &&
							node.children?.map((child: BaseComponent) => (
								<TreeNode
									id={child.id}
									key={child.id}
									level={level + 1}
									node={child}
									parentId={node.id}
								/>
							))}
					</div>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem
					className={"text-destructive"}
					onClick={() => confirmDelete(node.id, parentId, node.type)}
				>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
