import React from "react";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { ComponentItem } from "@/builder/definitions/componentsList";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { EmptyState } from "./EmptyState";
import { TreeNode } from "./TreeNode";

interface TreeViewProps {
	contentNodes: ComponentItem[];
}

export function TreeView({ contentNodes }: TreeViewProps) {
	const { confirmDelete } = useDeleteComponentContext();

	return (
		<div>
			{contentNodes.length > 0 ? (
				contentNodes.map((contentNode: ComponentItem) => (
					<ContextMenu key={contentNode.id}>
						<ContextMenuTrigger>
							<TreeNode
								key={contentNode.id}
								node={contentNode}
								parentId={null}
							/>
						</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem
								className={"text-destructive"}
								onClick={() =>
									confirmDelete(
										contentNode.id,
										null,
										contentNode.type,
									)
								}
							>
								Delete
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				))
			) : (
				<EmptyState />
			)}
		</div>
	);
}
