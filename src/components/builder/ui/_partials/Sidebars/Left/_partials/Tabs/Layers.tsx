"use client";

import { useBuilderShortcuts } from "@/builder/hooks/useBuilderShortcuts";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/builder/types/components/components";
import {
	mapContentToTree,
	PageTitle,
	TreeView,
} from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Layers";

export default function BuilderTabLayers() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	useBuilderShortcuts();

	const contentNodes: BuilderComponent[] =
		currentPage.content && Array.isArray(currentPage.content)
			? mapContentToTree(currentPage.content)
			: [];

	return (
		<div className={"divide-y"}>
			<PageTitle title={currentPage.title} />
			<div className="flex flex-col gap-2 px-4 py-2 text-sm">
				<TreeView contentNodes={contentNodes} type={"content"} />
			</div>
		</div>
	);
}
