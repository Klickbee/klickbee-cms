import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import CollectionCreateForm from "@/components/admin/manage/collection/create/collectionCreateForm";

export default function Page() {
	return (
		<section className="flex flex-col gap-4">
			<DashboardTitle
				hasBackButton
				subtitle="CreateCollectionSubtitle"
				title="CreateCollection"
				translationNamespace="Contents"
			/>
			<div className="px-8 py-4">
				<CollectionCreateForm />
			</div>
		</section>
	);
}
