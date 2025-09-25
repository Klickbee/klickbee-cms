import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import CollectionUpdateForm from "@/components/admin/manage/collection/update/collectionUpdateForm";
import { collectionBySlugForEditOptions } from "@/feature/collection/options/collectionBySlugOptions";
import { getQueryClient } from "@/lib/getQueryClient";

interface PageProps {
	params: Promise<{
		collectionSlug: string;
	}>;
}

export default async function Page({ params }: PageProps) {
	const { collectionSlug } = await params;

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		collectionBySlugForEditOptions(collectionSlug),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<section className="flex flex-col gap-4">
				<DashboardTitle
					hasBackButton
					subtitle="UpdateCollectionSubtitle"
					title="UpdateCollection"
					translationNamespace="Contents"
				/>
				<div className="px-8 py-4">
					<CollectionUpdateForm collectionSlug={collectionSlug} />
				</div>
			</section>
		</HydrationBoundary>
	);
}
