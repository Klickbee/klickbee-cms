import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { use } from "react";
import CardListLayout from "@/components/admin/_partials/cardListLayout";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import CollectionItemActionButton from "@/components/admin/manage/collectionItems/collectionItemActionButton";
import CollectionItemFilterSelector from "@/components/admin/manage/collectionItems/collectionItemFilterSelector";
import CollectionItemPagination from "@/components/admin/manage/collectionItems/collectionItemPagination";
import CollectionItemSearchBar from "@/components/admin/manage/collectionItems/collectionItemSearchBar";
import CollectionItemTable from "@/components/admin/manage/collectionItems/collectionItemTable";
import { CollectionItemsTableProvider } from "@/feature/collectionItem/contexts/CollectionItemsTableContext";
import { allCollectionItemsBySlugOptions } from "@/feature/collectionItem/options/allCollectionItemsBySlugOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function CollectionItemsPage({
	params,
}: {
	params: Promise<{ collectionSlug: string; adminKey: string }>;
}) {
	const { collectionSlug } = use(params);
	const t = useTranslations("CollectionItems");

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		allCollectionItemsBySlugOptions(collectionSlug),
	);

	const data = queryClient.getQueryData(
		allCollectionItemsBySlugOptions(collectionSlug).queryKey,
	);

	const collectionName = data?.collectionName || collectionSlug;

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardTitle
				subtitle="ManageCollectionItemsSubtitle"
				title="ManageCollectionItems"
				translationNamespace="CollectionItems"
			/>
			<section className="py-6 px-8">
				<CollectionItemsTableProvider collectionSlug={collectionSlug}>
					<CardListLayout
						actionButtons={<CollectionItemActionButton />}
						createButtonText={t("CreateNew")}
						createUrl={`/manage/content/items/${collectionSlug}/create`}
						filterSelector={<CollectionItemFilterSelector />}
						icon={<Plus />}
						searchBar={<CollectionItemSearchBar />}
						title={`${t("ManageItems")} - ${collectionName}`}
					>
						<CollectionItemTable />
						<CollectionItemPagination />
					</CardListLayout>
				</CollectionItemsTableProvider>
			</section>
		</HydrationBoundary>
	);
}
