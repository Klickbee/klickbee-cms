import BuilderTabContent from "@/components/builder/ui/_partials/Sidebars/Left/TabContent";
import BuilderTabSwitcher from "@/components/builder/ui/_partials/Sidebars/Left/TabSwitcher";

export default function BuilderLeftSidebar() {
	return (
		<>
			<BuilderTabSwitcher />
			<BuilderTabContent />
		</>
	);
}
