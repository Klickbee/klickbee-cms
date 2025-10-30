import CheckConnectionForm from "@/feature/settings/components/email/checkConnectionForm";
import EmailSettingsForm from "@/feature/settings/components/email/emailSettingsForm";

export default function EmailSettingsPage() {
	return (
		<div className="w-full">
			<h1 className="p-4">Email Settings Page</h1>
			<div className="flex gap-3">
				<EmailSettingsForm />
				<CheckConnectionForm />
			</div>
		</div>
	);
}
