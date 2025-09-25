import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import CollectionItemCreateForm from "@/components/admin/manage/collectionItems/create/collectionItemCreateForm";

export default async function Page({
	params,
}: {
	params: Promise<{ collectionSlug: string }>;
}) {
	const { collectionSlug } = await params;
	return (
		<section className="flex flex-col gap-4">
			<DashboardTitle
				subtitle="CreateCollectionItemSubtitle"
				title="CreateCollectionItem"
				translationNamespace="CollectionItems"
			/>
			<div className="px-8 py-4">
				<CollectionItemCreateForm collectionSlug={collectionSlug} />
			</div>
		</section>
	);
}
