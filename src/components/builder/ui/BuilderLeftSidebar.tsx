"use client";
import { useEffect } from "react";
import { useCurrentTabStore } from "@/builder/store/storeCurrentTabsSidebar";
import BuilderTabContent from "@/components/builder/ui/_partials/Sidebars/Left/TabContent";
import BuilderTabSwitcher from "@/components/builder/ui/_partials/Sidebars/Left/TabSwitcher";

export default function BuilderLeftSidebar() {
	// Use useEffect to set the initial tab state after component mounts
	useEffect(() => {
		useCurrentTabStore.setState({
			currentTab: "Pages",
		});
	}, []);

	return (
		<>
			<BuilderTabSwitcher />
			<BuilderTabContent />
		</>
	);
}
