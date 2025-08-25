import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import CardTitle from "@/components/admin/manage/CardTitle";
import ContactActionButton from "@/components/admin/manage/contact/contactActionButton";
import ContactSearchBar from "@/components/admin/manage/contact/contactSearchBar";
import ContactsPagination from "@/components/admin/manage/contact/contactsPagination";
import ContactsTable from "@/components/admin/manage/contact/contactsTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContactsTableProvider } from "@/feature/contact/contexts/ContactsTableContext";
import { allContactsOptions } from "@/feature/contact/options/allContactsOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function Page() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(allContactsOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardTitle
				subtitle="ManageContactsSubtitle"
				title="ManageContacts"
				translationNamespace="Contacts"
			/>
			<section className="py-6 px-8">
				<Card className="gap-0 py-0">
					<CardHeader className="py-3 px-4 gap-0 flex flex-row justify-between items-center border-b">
						<CardTitle>Form submission</CardTitle>
						<ContactActionButton />
					</CardHeader>
					<CardContent className="p-4 flex flex-col gap-4">
						<ContactsTableProvider>
							<ContactSearchBar />
							<ContactsTable />
							<ContactsPagination />
						</ContactsTableProvider>
					</CardContent>
				</Card>
			</section>
		</HydrationBoundary>
	);
}
