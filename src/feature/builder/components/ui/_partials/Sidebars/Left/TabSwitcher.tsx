"use client";

import { useCurrentTabStore } from "@/feature/builder/store/storeCurrentTabsSidebar";
import { cn } from "@/lib/utils";

const tabs = ["Pages", "Layers", "Components"];

export default function BuilderTabSwitcher() {
	const activeTab = useCurrentTabStore((state) => state.currentTab);
	const setActiveTab = useCurrentTabStore((state) => state.setCurrentTab);
	return (
		<div className="inline-flex items-center p-4 text-sm font-medium">
			<div className="text-muted-foreground bg-muted rounded-md p-2 m-auto">
				{tabs.map((tab) => (
					<button
						className={cn(
							"px-2 py-1.5 rounded-sm transition-colors",
							activeTab === tab
								? "bg-background text-foreground shadow-sm"
								: "hover:text-foreground",
						)}
						key={tab}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</button>
				))}
			</div>
		</div>
	);
}
