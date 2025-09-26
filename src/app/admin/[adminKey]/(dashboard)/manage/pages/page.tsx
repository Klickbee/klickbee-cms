import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import CardListLayout from "@/components/admin/_partials/cardListLayout";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import PageActionButton from "@/components/admin/manage/page/pageActionButton";
import PagesPagination from "@/components/admin/manage/page/pagePagination";
import PageSearchBar from "@/components/admin/manage/page/pageSearchBar";
import PageTable from "@/components/admin/manage/page/pageTable";
import { allPagesOptions } from "@/feature/page/options/allPagesOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function AdminPagesPage() {
	const t = useTranslations("Pages");

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(allPagesOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardTitle
				subtitle="ManageSubtitle"
				title="ManageTitle"
				translationNamespace="Pages"
			/>
			<section className="py-6 px-8">
				<CardListLayout
					actionButtons={<PageActionButton />}
					createButtonText={t("CreateNew")}
					createUrl="/builder?action=create_page"
					icon={<Plus />}
					searchBar={<PageSearchBar />}
					title={t("ListTitle")}
				>
					<PageTable />
					<PagesPagination />
				</CardListLayout>
			</section>
		</HydrationBoundary>
	);
}
