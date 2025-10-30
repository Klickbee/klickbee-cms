import BuilderTabContent from "@/feature/builder/components/ui/_partials/Sidebars/Left/TabContent";
import BuilderTabSwitcher from "@/feature/builder/components/ui/_partials/Sidebars/Left/TabSwitcher";

export default function BuilderLeftSidebar() {
	return (
		<div className="border-r border-gray-200 h-[calc(100vh_-5rem)] flex flex-col overflow-hidden w-full">
			<BuilderTabSwitcher />
			<div className="flex-1 min-h-0">
				<BuilderTabContent />
			</div>
		</div>
	);
}
