import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import CardListLayout from "@/components/admin/_partials/cardListLayout";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import ContactActionButton from "@/components/admin/manage/contact/contactActionButton";
import ContactSearchBar from "@/components/admin/manage/contact/contactSearchBar";
import ContactsPagination from "@/components/admin/manage/contact/contactsPagination";
import ContactsTable from "@/components/admin/manage/contact/contactsTable";
import { ContactsTableProvider } from "@/feature/contact/contexts/ContactsTableContext";
import { allContactsOptions } from "@/feature/contact/options/allContactsOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function Page() {
	const t = useTranslations("Contacts");

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
				<ContactsTableProvider>
					<CardListLayout
						actionButtons={<ContactActionButton />}
						searchBar={<ContactSearchBar />}
						title={t("ManageContacts")}
					>
						<ContactsTable />
						<ContactsPagination />
					</CardListLayout>
				</ContactsTableProvider>
			</section>
		</HydrationBoundary>
	);
}
