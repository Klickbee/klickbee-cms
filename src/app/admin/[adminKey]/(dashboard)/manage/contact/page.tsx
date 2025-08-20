import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import ContactActionButton from "@/components/admin/manage/contact/contactActionButton";
import ContactSearchBar from "@/components/admin/manage/contact/contactSearchBar";
import ContactsPagination from "@/components/admin/manage/contact/contactsPagination";
import ContactsTable from "@/components/admin/manage/contact/contactsTable";
import { ContactsTableProvider } from "@/feature/contact/contexts/ContactsTableContext";
import { allContactsOptions } from "@/feature/contact/options/allContactsOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function Page() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(allContactsOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<section className="flex flex-col gap-4">
				<DashboardTitle
					subtitle="ManageContactsSubtitle"
					title="ManageContacts"
					translationNamespace="Contacts"
				/>
				<div className="p-12 space-y-4">
					<ContactsTableProvider>
						<div className="flex items-center justify-between gap-4">
							<ContactSearchBar />
							<ContactActionButton />
						</div>
						<ContactsTable />
						<ContactsPagination />
					</ContactsTableProvider>
				</div>
			</section>
		</HydrationBoundary>
	);
}
