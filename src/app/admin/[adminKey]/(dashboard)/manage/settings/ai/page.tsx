import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import AiContextForm from "@/feature/settings/components/ai/aiContextForm";
import AiSettingsForm from "@/feature/settings/components/ai/aiSettingsForm";

export default function AiSettingsPage() {
	return (
		<>
			<DashboardTitle
				subtitle="ManageAiSubtitle"
				title="ManageAi"
				translationNamespace="SettingsAi"
			/>
			<section className="py-6 px-8 flex flex-col gap-4">
				<AiSettingsForm />
				<AiContextForm />
			</section>
		</>
	);
}
