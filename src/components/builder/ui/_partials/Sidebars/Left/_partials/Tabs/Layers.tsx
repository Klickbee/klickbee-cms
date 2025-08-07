import { ComponentItem } from "@/builder/definitions/componentsList";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import {
	mapContentToTree,
	PageTitle,
	TreeView,
} from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Layers";

export default function BuilderTabLayers() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);

	const contentNodes: ComponentItem[] =
		currentPage.content && Array.isArray(currentPage.content)
			? mapContentToTree(currentPage.content as ComponentItem[])
			: [];

	return (
		<div className={"divide-y"}>
			<PageTitle title={currentPage.title} />
			<div className="flex flex-col gap-2 px-4 py-2 text-sm">
				<TreeView contentNodes={contentNodes} />
			</div>
		</div>
	);
}
