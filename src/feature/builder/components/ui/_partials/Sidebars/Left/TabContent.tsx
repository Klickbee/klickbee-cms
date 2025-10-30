"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import BuilderTabComponents from "@/feature/builder/components/ui/_partials/Sidebars/Left/_partials/Tabs/Components";
import BuilderTabLayers from "@/feature/builder/components/ui/_partials/Sidebars/Left/_partials/Tabs/Layers";
import BuilderTabPages from "@/feature/builder/components/ui/_partials/Sidebars/Left/_partials/Tabs/Pages";
import { useCurrentTabStore } from "@/feature/builder/store/storeCurrentTabsSidebar";

export default function BuilderTabContent() {
	const activeTab = useCurrentTabStore((state) => state.currentTab);

	let content = null as unknown as React.ReactNode;
	if (activeTab === "Pages") content = <BuilderTabPages />;
	else if (activeTab === "Layers") content = <BuilderTabLayers />;
	else if (activeTab === "Components") content = <BuilderTabComponents />;

	return <ScrollArea className="h-full w-full">{content}</ScrollArea>;
}
