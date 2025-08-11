import React from "react";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { BuilderComponent } from "@/builder/types/components/components";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { EmptyState } from "./EmptyState";
import { TreeNode } from "./TreeNode";

interface TreeViewProps {
	contentNodes: BuilderComponent[];
}

export function TreeView({ contentNodes }: TreeViewProps) {
	const { confirmDelete } = useDeleteComponentContext();

	return (
		<div>
			{contentNodes.length > 0 ? (
				<React.Fragment>
					{contentNodes.map((contentNode: BuilderComponent) => (
						<ContextMenu key={contentNode.id}>
							<ContextMenuTrigger>
								<TreeNode
									id={contentNode.id}
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
					))}
				</React.Fragment>
			) : (
				<EmptyState />
			)}
		</div>
	);
}
