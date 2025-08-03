"use client";

import { useState } from "react";
import BuilderSearchComponent from "@/components/builder/ui/_partials/Sidebars/Left/Search";
import BuilderTabContent from "@/components/builder/ui/_partials/Sidebars/Left/TabContent";
import BuilderTabSwitcher from "@/components/builder/ui/_partials/Sidebars/Left/TabSwitcher";

export default function BuilderLeftSidebar() {
	const [activeTab, setActiveTab] = useState("Pages");

	return (
		<div className="w-64 bg-white divide-y border-r border-t border-gray-200 h-full flex flex-col">
			<BuilderTabSwitcher
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<BuilderSearchComponent />
			<BuilderTabContent activeTab={activeTab} />
		</div>
	);
}
