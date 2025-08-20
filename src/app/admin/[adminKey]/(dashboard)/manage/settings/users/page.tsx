import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import UserActionButton from "@/components/admin/settings/users/actionButton";
import UsersPagination from "@/components/admin/settings/users/pagination";
import UserSearchBar from "@/components/admin/settings/users/searchBar";
import UsersTable from "@/components/admin/settings/users/usersTable";
import { UsersTableProvider } from "@/feature/user/contexts/UsersTableContext";
import { allUsersOptions } from "@/feature/user/options/allUsersOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function Page() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(allUsersOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<section className="flex flex-col gap-4">
				<DashboardTitle
					subtitle="ManageUsersSubtitle"
					title="ManageUsers"
					translationNamespace="SettingsUsers"
				/>
				<div className="p-12 space-y-4">
					<UsersTableProvider>
						<div className="flex items-center justify-between gap-4">
							<UserSearchBar />
							<UserActionButton />
						</div>
						<UsersTable />
						<UsersPagination />
					</UsersTableProvider>
				</div>
			</section>
		</HydrationBoundary>
	);
}
