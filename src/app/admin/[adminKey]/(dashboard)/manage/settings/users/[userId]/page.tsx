import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import UserUpdateForm from "@/components/admin/settings/users/update/userUpdateForm";
import { userByIdForEditOptions } from "@/feature/user/options/userByIdOptions";
import { getQueryClient } from "@/lib/getQueryClient";

interface PageProps {
	params: Promise<{
		userId: string;
	}>;
}

export default async function Page({ params }: PageProps) {
	const { userId } = await params;

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(userByIdForEditOptions(userId));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<section className="flex flex-col gap-4">
				<DashboardTitle
					hasBackButton
					subtitle="UpdateUserSubtitle"
					title="UpdateUser"
					translationNamespace="SettingsUsers"
				/>
				<div className="p-12">
					<UserUpdateForm userId={userId} />
				</div>
			</section>
		</HydrationBoundary>
	);
}
