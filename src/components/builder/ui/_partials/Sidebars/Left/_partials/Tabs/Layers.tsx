"use client";

import { useBuilderShortcuts } from "@/builder/hooks/useBuilderShortcuts";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/builder/types/components/components";
import {
	mapContentToTree,
	PageTitle,
	TreeView,
} from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Layers";
import { usePageHeaderByPage } from "@/feature/page/_header/queries/usePageHeader";

export default function BuilderTabLayers() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	useBuilderShortcuts();

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

	return (
		<div className={"divide-y"}>
			<PageTitle title={currentPage.title} />
			{/* Content tree */}
			<div className="flex flex-col gap-2 px-4 py-2 text-sm">
				{headerNodes.length > 0 && (
					<TreeView contentNodes={headerNodes} type={"header"} />
				)}
				<TreeView contentNodes={contentNodes} type={"content"} />
			</div>
		</div>
	);
}
