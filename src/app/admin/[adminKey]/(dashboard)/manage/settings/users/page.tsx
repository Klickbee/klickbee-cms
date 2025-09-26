import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import CardListLayout from "@/components/admin/_partials/cardListLayout";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import UserActionButton from "@/components/admin/settings/users/userActionsButton";
import UserFilterSelector from "@/components/admin/settings/users/userFilterSelector";
import UsersPagination from "@/components/admin/settings/users/userPagination";
import UserSearchBar from "@/components/admin/settings/users/userSearchBar";
import UserTable from "@/components/admin/settings/users/userTable";
import { allUsersOptions } from "@/feature/user/options/allUsersOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function Page() {
	const t = useTranslations("SettingsUsers");
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
				<CardListLayout
					actionButtons={<UserActionButton />}
					createButtonText={t("Add")}
					createUrl="/manage/settings/users/create"
					filterSelector={<UserFilterSelector />}
					icon={<Plus />}
					searchBar={<UserSearchBar />}
					title={t("UsersListTitle")}
				>
					<UserTable />
					<UsersPagination />
				</CardListLayout>
			</section>
		</HydrationBoundary>
	);
}
