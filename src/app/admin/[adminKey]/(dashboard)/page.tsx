import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import CardListLayout from "@/components/admin/_partials/cardListLayout";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import CollectionItemActionButton from "@/components/admin/dashboard/collectionItemActionButton";
import CollectionItemSortSelector from "@/components/admin/dashboard/collectionItemFilterSelector";
import CollectionItemPagination from "@/components/admin/dashboard/collectionItemPagination";
import CollectionItemSearchBar from "@/components/admin/dashboard/collectionItemSearchBar";
import CollectionItemTable from "@/components/admin/dashboard/collectionItemTable";
import { CollectionItemProvider } from "@/feature/dashboard/contexts/collectionItemContext";
import { allCollectionItemsOptions } from "@/feature/dashboard/options/allCollectionItemsOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function AdminPage() {
	const t = useTranslations("Dashboard");

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(allCollectionItemsOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardTitle
				subtitle="DashboardSubtitle"
				title="DashboardTitle"
				translationNamespace="Dashboard"
			/>
			<section className="py-6 px-8">
				<CollectionItemProvider>
					<CardListLayout
						actionButtons={<CollectionItemActionButton />}
						createButtonText={t("ContentManagerLinkText")}
						createUrl="/manage/content"
						filterSelector={<CollectionItemSortSelector />}
						searchBar={<CollectionItemSearchBar />}
						title={t("CollectionItemsTitle")}
					>
						<CollectionItemTable />
						<CollectionItemPagination />
					</CardListLayout>
				</CollectionItemProvider>
			</section>
		</HydrationBoundary>
	);
}
