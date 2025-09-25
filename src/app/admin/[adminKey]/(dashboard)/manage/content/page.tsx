import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import CardListLayout from "@/components/admin/_partials/cardListLayout";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import CollectionActionButton from "@/components/admin/manage/collection/collectionActionButton";
import CollectionPagination from "@/components/admin/manage/collection/collectionPagination";
import CollectionSearchBar from "@/components/admin/manage/collection/collectionSearchBar";
import CollectionTable from "@/components/admin/manage/collection/collectionTable";
import { CollectionsTableProvider } from "@/feature/collection/contexts/CollectionsTableContext";
import { allCollectionsOptions } from "@/feature/collection/options/allCollectionsOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function Page() {
	const t = useTranslations("Contents");

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(allCollectionsOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardTitle
				subtitle="ManageContentsSubtitle"
				title="ManageContents"
				translationNamespace="Contents"
			/>
			<section className="py-6 px-8">
				<CollectionsTableProvider>
					<CardListLayout
						actionButtons={<CollectionActionButton />}
						createButtonText={t("CreateCollection")}
						createUrl="/manage/content/create"
						icon={<Plus />}
						searchBar={<CollectionSearchBar />}
						title={t("Collections")}
					>
						<CollectionTable />
						<CollectionPagination />
					</CardListLayout>
				</CollectionsTableProvider>
			</section>
		</HydrationBoundary>
	);
}
