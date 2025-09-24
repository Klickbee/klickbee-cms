import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import SeoPage from "@/components/admin/manage/page/seo";
import { pageByIdOptions } from "@/feature/page/options/pageByIdOptions";
import type { Page } from "@/feature/page/types/page";
import { getQueryClient } from "@/lib/getQueryClient";

interface PageProps {
	params: Promise<{
		pageId: string;
	}>;
}

export default async function PageSettings({ params }: PageProps) {
	const { pageId } = await params;

	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(pageByIdOptions(Number(pageId)));

	const page = queryClient.getQueryData(
		pageByIdOptions(Number(pageId)).queryKey,
	) as Page | undefined;

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardTitle
				hasBackButton
				subtitle="SeoSubtitle"
				title="SubPageTitle"
				titleParams={{ title: page?.title || "" }}
				translationNamespace="Pages"
			/>
			<section className="py-6 px-8">
				<SeoPage page={page} />
			</section>
		</HydrationBoundary>
	);
}
