"use client";

import { BreakpointProvider } from "@/feature/builder/contexts/BreakpointContext";
import { useActiveBreakpointStore } from "@/feature/builder/store/storeActiveBreakpoint";
import { useCurrentComponentStore } from "@/feature/builder/store/storeCurrentComponent";
import { useSetting } from "@/feature/settings/queries/useSettings";
import BuilderContentProperties from "./_partials/Sidebars/Right/ContentProperties";
import BuilderStyleProperties from "./_partials/Sidebars/Right/StyleProperties";

export default function BuilderRightSidebar() {
	const { currentComponent } = useCurrentComponentStore();

	// Determine the active editing breakpoint and provide it to the sidebar
	const { active } = useActiveBreakpointStore();
	const { data: breakpointsRaw } = useSetting("builder_breakpoints") || [];
	const breakpoints: Array<{ name: string; width: number }> =
		breakpointsRaw?.value ? JSON.parse(breakpointsRaw.value) : [];
	const widest = breakpoints.reduce(
		(max, bp) => (bp && bp.width > (max?.width ?? 0) ? bp : max),
		breakpoints[0] || { name: "default", width: 1920 },
	);
	const bp = active ?? widest;

	return (
		<BreakpointProvider value={bp}>
			{!currentComponent || currentComponent.id === "none" ? null : (
				<div className="border-l border-gray-200 h-[calc(100vh_-4rem)] flex flex-col overflow-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden;">
					<BuilderContentProperties />
					<BuilderStyleProperties />
				</div>
			)}
		</BreakpointProvider>
	);
}
