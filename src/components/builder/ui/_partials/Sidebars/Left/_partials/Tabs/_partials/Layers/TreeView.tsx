import React from "react";
import { ComponentItem } from "@/builder/definitions/componentsList";
import { useDeleteComponent } from "@/builder/hooks/useDeleteComponent";
import { Button } from "@/components/ui/button";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState } from "./EmptyState";
import { TreeNode } from "./TreeNode";

interface TreeViewProps {
	contentNodes: ComponentItem[];
}

export function TreeView({ contentNodes }: TreeViewProps) {
	const {
		confirmDelete,
		cancelDelete,
		handleDelete,
		componentTypeToDelete,
		isConfirmDialogOpen,
		setIsConfirmDialogOpen,
	} = useDeleteComponent({ showNotifications: true });

	return (
		<div>
			{contentNodes.length > 0 ? (
				contentNodes.map((contentNode: ComponentItem) => (
					<ContextMenu key={contentNode.id}>
						<ContextMenuTrigger>
							<TreeNode
								key={contentNode.id}
								node={contentNode}
								onDeleteRequest={confirmDelete}
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

			<Dialog
				onOpenChange={setIsConfirmDialogOpen}
				open={isConfirmDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Deletion</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this{" "}
							<b>
								{componentTypeToDelete
									? `${componentTypeToDelete} component`
									: "component"}
							</b>{" "}
							? This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={cancelDelete} variant="outline">
							Cancel
						</Button>
						<Button onClick={handleDelete} variant="destructive">
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
