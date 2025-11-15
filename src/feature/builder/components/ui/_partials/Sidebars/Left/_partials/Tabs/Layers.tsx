"use client";

import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	mapContentToTree,
	PageTitle,
	TreeView,
} from "@/feature/builder/components/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Layers";
import { useBuilderShortcuts } from "@/feature/builder/hooks/useBuilderShortcuts";
import { useActiveBreakpointStore } from "@/feature/builder/store/storeActiveBreakpoint";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { usePageFooterByPage } from "@/feature/page/_footer/queries/usePageFooter";
import { usePageHeaderByPage } from "@/feature/page/_header/queries/usePageHeader";
import { useSetting } from "@/feature/settings/queries/useSettings";

function BreakpointSelector() {
	const { data: breakpointsRaw } = useSetting("builder_breakpoints") || [];
	const breakpoints: Array<{ name: string; width: number }> =
		breakpointsRaw?.value ? JSON.parse(breakpointsRaw.value) : [];
	const { active, setActive } = useActiveBreakpointStore();
	return (
		<Select
			onValueChange={(val) => {
				const width = Number(val);
				const found = breakpoints.find((b) => b.width === width);
				if (found) setActive(found);
			}}
			value={active?.width ? String(active.width) : "default"}
		>
			<SelectTrigger className={"w-full"} size="sm">
				<SelectValue placeholder="Breakpoint" />
			</SelectTrigger>
			<SelectContent>
				{breakpoints
					.slice()
					.sort((a, b) => b.width - a.width)
					.map((bp) => (
						<SelectItem key={bp.width} value={String(bp.width)}>
							{bp.name} ({bp.width}px)
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
}

export default function BuilderTabLayers() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	useBuilderShortcuts();
	const [rootExpanded, setRootExpanded] = useState<boolean>(true);

	// Map content (page body) to tree nodes
	const contentNodes: BuilderComponent[] =
		currentPage.content && Array.isArray(currentPage.content)
			? mapContentToTree(currentPage.content)
			: [];

	// Load and map header to tree nodes
	const pageId =
		currentPage?.id && currentPage.id > 0 ? currentPage.id : undefined;
	const { data: pageHeader } = usePageHeaderByPage(pageId);
	const headerComponents: BuilderComponent[] = Array.isArray(
		pageHeader?.content,
	)
		? (pageHeader.content as BuilderComponent[])
		: pageHeader?.content
			? ([pageHeader.content] as BuilderComponent[])
			: [];
	const headerNodes: BuilderComponent[] =
		headerComponents.length > 0 ? mapContentToTree(headerComponents) : [];

	// Load and map footer to tree nodes
	const { data: pageFooter } = usePageFooterByPage(pageId);
	const footerComponents: BuilderComponent[] = Array.isArray(
		pageFooter?.content,
	)
		? (pageFooter.content as BuilderComponent[])
		: pageFooter?.content
			? ([pageFooter.content] as BuilderComponent[])
			: [];
	const footerNodes: BuilderComponent[] =
		footerComponents.length > 0 ? mapContentToTree(footerComponents) : [];

	return (
		<div className={"divide-y"}>
			<div className="flex flex-col items-start justify-between px-4 py-2 gap-0">
				<PageTitle title={currentPage.title} />
				<BreakpointSelector />
			</div>
			{/* Content tree */}
			<div className="flex flex-col px-4 py-2 text-sm gap-0">
				<button
					aria-label={
						rootExpanded
							? "Collapse all root elements"
							: "Expand all root elements"
					}
					className="text-xs mb-2 px-2 py-1 rounded bg-transparent border border-gray-200 hover:bg-gray-50"
					onClick={() => setRootExpanded((v) => !v)}
				>
					{rootExpanded ? "Collapse all" : "Expand all"}
				</button>
				{headerNodes.length > 0 && (
					<TreeView
						contentNodes={headerNodes}
						rootExpand={rootExpanded}
						type={"header"}
					/>
				)}
				<TreeView
					contentNodes={contentNodes}
					rootExpand={rootExpanded}
					type={"content"}
				/>
				{footerNodes.length > 0 && (
					<TreeView
						contentNodes={footerNodes}
						rootExpand={rootExpanded}
						type={"footer"}
					/>
				)}
			</div>
		</div>
	);
}
