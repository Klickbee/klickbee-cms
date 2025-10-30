import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import CardTitle from "@/components/admin/manage/CardTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserActionButton from "@/feature/settings/components/users/actionButton";
import UsersPagination from "@/feature/settings/components/users/pagination";
import UserSearchBar from "@/feature/settings/components/users/searchBar";
import UsersTable from "@/feature/settings/components/users/usersTable";
import { UsersTableProvider } from "@/feature/user/contexts/UsersTableContext";
import { allUsersOptions } from "@/feature/user/options/allUsersOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function Page() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(allUsersOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardTitle
				subtitle="ManageUsersSubtitle"
				title="ManageUsers"
				translationNamespace="SettingsUsers"
			/>
			<section className="py-6 px-8">
				<Card className="gap-0 py-0">
					<CardHeader className="py-3 px-4 gap-0 flex flex-row justify-between items-center border-b">
						<CardTitle>Users</CardTitle>
						<UserActionButton />
					</CardHeader>
					<CardContent className="p-4 flex flex-col gap-4">
						<UsersTableProvider>
							<UserSearchBar />
							<UsersTable />
							<UsersPagination />
						</UsersTableProvider>
					</CardContent>
				</Card>
			</section>
		</HydrationBoundary>
	);
}
