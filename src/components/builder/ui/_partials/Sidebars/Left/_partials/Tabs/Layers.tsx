import { Box, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
	ComponentItem,
	componentsList,
} from "@/builder/definitions/componentsList";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { BaseComponent } from "@/builder/types/components/component";
import { cn } from "@/lib/utils";

function TreeNode({
	node,
	level = 0,
}: {
	node: ComponentItem;
	level?: number;
}) {
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
					setExpanded(!expanded);
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

export default function BuilderTabLayers() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const getComponentIcon = (component: BaseComponent) => {
		const componentDef = componentsList.find(
			(c: ComponentItem) => c.id === component.type,
		);
		return componentDef ? componentDef.icon : <Box className="w-4 h-4" />;
	};

	const mapContentToTree = (content: ComponentItem[]): ComponentItem[] => {
		return content.map((component) => {
			const base = componentsList.find(
				(c) => c.id === component.group,
			) || {
				group: component.group || "",
				icon: getComponentIcon(component as unknown as BaseComponent),
				id: component.id,
				label: component.label || component.group,
				type: component.type || "undefined",
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
		<div className={"divide-y"}>
			<div className="text-primary font-medium px-4 py-3">
				{currentPage.title}
			</div>
			<div className="flex flex-col gap-2 px-4 py-2 text-sm">
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
		</div>
	);
}
