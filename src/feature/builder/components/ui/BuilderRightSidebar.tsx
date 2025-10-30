"use client";

import { useCurrentComponentStore } from "@/feature/builder/store/storeCurrentComponent";
import BuilderContentProperties from "./_partials/Sidebars/Right/ContentProperties";
import BuilderStyleProperties from "./_partials/Sidebars/Right/StyleProperties";

export default function BuilderRightSidebar() {
	const { currentComponent } = useCurrentComponentStore();

	if (!currentComponent || currentComponent.id === "none") {
		return null;
	}

	return (
		<div className="border-l border-gray-200 h-[calc(100vh_-4rem)] flex flex-col overflow-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden;">
			<BuilderContentProperties />
			<BuilderStyleProperties />
		</div>
	);
}
