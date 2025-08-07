import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronRight, GripVertical } from "lucide-react";
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

export function TreeNode({
	id,
	node,
	level = 0,
	parentId = null,
	isDragging = false,
}: TreeNodeProps) {
	const { confirmDelete } = useDeleteComponentContext();
	const [expanded, setExpanded] = useState(true);
	const setCurrentComponent = useCurrentComponentStore(
		(state) => state.setCurrentComponent,
	);
	const hasChildren = node.children && node.children.length > 0;
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);

	// Check if this node is a valid container type
	const validContainerTypes = ["section", "grid", "container"];
	const isValidContainer = validContainerTypes.includes(node.type);

	// Make valid containers droppable
	const { isOver: isDroppableOver, setNodeRef: setDroppableRef } =
		useDroppable({
			data: {
				containerId: id,
				isContainer: isValidContainer,
			},
			disabled: !isValidContainer,
			id: `droppable-${id}`,
		});

	const {
		attributes,
		listeners,
		setNodeRef: setSortableRef,
		transform,
		transition,
		isDragging: isSortableDragging,
		isOver: isSortableOver,
	} = useSortable({ id });

	// Combine the refs
	const setNodeRef = (element: HTMLElement | null) => {
		setSortableRef(element);
		if (isValidContainer) {
			setDroppableRef(element);
		}
	};

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const isCurrentComponent = (id: string) => {
		return currentComponent.id === id;
	};

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="ml-2 py-0.5" ref={setNodeRef} style={style}>
					<div
						className={cn(
							"flex items-center gap-1 py-1.5 px-0.5 cursor-pointer text-sm text-primary hover:text-background hover:bg-foreground rounded-md",
							level > 0 && "pl-4",
							isCurrentComponent(node.id)
								? "bg-foreground text-background"
								: "",
							(isDragging || isSortableDragging) && "opacity-50",
							isSortableOver &&
								"border-2 border-dashed border-primary",
							// isValidContainer && "ring-1 ring-inset ring-blue-300",
							isValidContainer &&
								isDroppableOver &&
								"ring-2 ring-inset ring-blue-500 bg-blue-50 text-primary",
						)}
						onClick={() => {
							setExpanded(
								!isCurrentComponent(node.id) ? true : !expanded,
							);
							setCurrentComponent(node);
						}}
					>
						<div
							className="cursor-grab active:cursor-grabbing mr-1"
							{...attributes}
							{...listeners}
						>
							<GripVertical className="w-4 h-4" />
						</div>
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
