import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import ContactInformationForm from "@/components/admin/settings/contact/contactInformationForm";
import ContactNotificationForm from "@/components/admin/settings/contact/contactNotificationForm";

export default function ContactSettingsPage() {
	return (
		<>
			<DashboardTitle
				subtitle="ManageContactSubtitle"
				title="ManageContact"
				translationNamespace="SettingsContact"
			/>
			<section className="py-6 px-8 flex flex-col gap-4">
				<ContactInformationForm />
				<ContactNotificationForm />
			</section>
		</>
	);
}
