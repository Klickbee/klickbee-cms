"use client";

import { useBuilderShortcuts } from "@/builder/hooks/useBuilderShortcuts";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/builder/types/components/components";
import {
	mapContentToTree,
	PageTitle,
	TreeView,
} from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Layers";
import { usePageFooter } from "@/feature/page/queries/usePageFooter";
import { usePageHeader } from "@/feature/page/queries/usePageHeader";

export default function BuilderTabLayers() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	useBuilderShortcuts();
	const { data: pageHeader } = usePageHeader(currentPage.id);
	const { data: pageFooter } = usePageFooter(currentPage.id);

	const headerNodes: BuilderComponent[] = pageHeader?.content
		? mapContentToTree([pageHeader.content as BuilderComponent])
		: [];

	const contentNodes: BuilderComponent[] =
		currentPage.content && Array.isArray(currentPage.content)
			? mapContentToTree(currentPage.content)
			: [];

	const footerNodes: BuilderComponent[] = pageFooter?.content
		? mapContentToTree([pageFooter.content as BuilderComponent])
		: [];

	return (
		<div className={"divide-y"}>
			<PageTitle title={currentPage.title} />
			<div className="flex flex-col gap-2 px-4 py-2 text-sm">
				{pageHeader?.content && (
					<TreeView contentNodes={headerNodes} type={"header"} />
				)}
				<TreeView contentNodes={contentNodes} type={"content"} />
				{pageFooter?.content && (
					<TreeView contentNodes={footerNodes} type={"footer"} />
				)}
			</div>
		</div>
	);
}
