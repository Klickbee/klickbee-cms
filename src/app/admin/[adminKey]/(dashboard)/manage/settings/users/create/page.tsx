import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import UserCreateForm from "@/feature/settings/components/users/create/userCreateForm";

export default function Page() {
	return (
		<section className="flex flex-col gap-4">
			<DashboardTitle
				subtitle="CreateUserSubtitle"
				title="CreateUser"
				translationNamespace="SettingsUsers"
			/>
			<div className="p-12 space-y-4">
				<UserCreateForm />
			</div>
		</section>
	);
}
