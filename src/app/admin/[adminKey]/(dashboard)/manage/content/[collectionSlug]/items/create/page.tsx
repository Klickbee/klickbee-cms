import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import CollectionItemCreateForm from "@/components/admin/manage/collectionItems/create/collectionItemCreateForm";
import { allAuthorsOptions } from "@/feature/collectionItem/options/allAuthorsOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default async function Page({
	params,
}: {
	params: Promise<{ collectionSlug: string }>;
}) {
	const { collectionSlug } = await params;
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(allAuthorsOptions);

	return (
		<>
			<DashboardTitle
				hasBackButton
				subtitle="CreateCollectionItemSubtitle"
				title="CreateCollectionItem"
				translationNamespace="CollectionItems"
			/>
			<section className="py-6 px-8">
				<CollectionItemCreateForm collectionSlug={collectionSlug} />
			</section>
		</>
	);
}
