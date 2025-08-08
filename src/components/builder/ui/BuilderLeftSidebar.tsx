"use client";
import React, { useEffect } from "react";
import { useCurrentTabStore } from "@/builder/store/storeCurrentTabsSidebar";
import BuilderSearchComponent from "@/components/builder/ui/_partials/Sidebars/Left/Search";
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
		<div className="w-68  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
			<BuilderTabSwitcher />
			<BuilderTabContent />
		</div>
	);
}
