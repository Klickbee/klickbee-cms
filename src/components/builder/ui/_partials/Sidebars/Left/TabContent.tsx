"use client";

import { useCurrentTabStore } from "@/builder/store/storeCurrentTabsSidebar";
import BuilderTabComponents from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/Components";
import BuilderTabLayers from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/Layers";
import BuilderTabPages from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/Pages";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function BuilderTabContent() {
	const activeTab = useCurrentTabStore((state) => state.currentTab);

	let content = null as unknown as React.ReactNode;
	if (activeTab === "Pages") content = <BuilderTabPages />;
	else if (activeTab === "Layers") content = <BuilderTabLayers />;
	else if (activeTab === "Components") content = <BuilderTabComponents />;

	return <ScrollArea className="h-full w-full">{content}</ScrollArea>;
}
