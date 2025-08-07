import React from "react";
import { ComponentItem } from "@/builder/definitions/componentsList";
import { EmptyState } from "./EmptyState";
import { TreeNode } from "./TreeNode";

interface TreeViewProps {
	contentNodes: ComponentItem[];
}

export function TreeView({ contentNodes }: TreeViewProps) {
	return (
		<div>
			{contentNodes.length > 0 ? (
				contentNodes.map((contentNode: ComponentItem) => (
					<TreeNode key={contentNode.id} node={contentNode} />
				))
			) : (
				<EmptyState />
			)}
		</div>
	);
}
