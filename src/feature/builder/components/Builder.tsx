"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useAdminKey } from "@/feature/admin-key/lib/utils";
import BuilderLeftSidebar from "@/feature/builder/components/ui/BuilderLeftSidebar";
import BuilderPreview from "@/feature/builder/components/ui/BuilderPreview";
import BuilderRightSidebar from "@/feature/builder/components/ui/BuilderRightSidebar";
import { useActiveBreakpointStore } from "@/feature/builder/store/storeActiveBreakpoint";
import { Breakpoint } from "@/feature/builder/types/breakpoint";
import { useAddPage } from "@/feature/page/hooks/useAddPage";
import { useSetting } from "@/feature/settings/queries/useSettings";

export default function BuilderComponent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const adminKey = useAdminKey();
	const action = searchParams.get("action");
	const hasProcessedAction = useRef(false);
	const { addPage } = useAddPage();
	const { active: activeBreakpoint, setActive: setActiveBreakpoint } =
		useActiveBreakpointStore();

	// Function to clean up the URL after the action
	const clearActionFromUrl = useCallback(() => {
		const newSearchParams = new URLSearchParams(searchParams.toString());
		newSearchParams.delete("action");
		const newUrl = `/admin/${adminKey}/builder${newSearchParams.toString() ? "?" + newSearchParams.toString() : ""}`;
		router.replace(newUrl, { scroll: false });
	}, [searchParams, router]);

	const executeAction = useCallback(
		async (actionType: string) => {
			if (hasProcessedAction.current) return;

			hasProcessedAction.current = true;

			try {
				switch (actionType) {
					case "create_page":
						await addPage();
						break;
					default:
						console.warn(`Action not recognized: ${actionType}`);
				}
			} finally {
				// Clean URL after execution
				clearActionFromUrl();
				// Reset the flag after a delay to allow future actions
				setTimeout(() => {
					hasProcessedAction.current = false;
				}, 1000);
			}
		},
		[addPage, clearActionFromUrl],
	);

	const breakPoints = useSetting("builder_breakpoints");

	useEffect(() => {
		if (action && !hasProcessedAction.current) {
			executeAction(action);
		}
		if (!activeBreakpoint) {
			const bps: Breakpoint[] = breakPoints?.data?.value
				? JSON.parse(breakPoints.data.value)
				: [];
			if (bps.length > 0) {
				// set the biggest breakpoint as active
				const sortedBps = bps.sort(
					(a, b) => (b.width || 0) - (a.width || 0),
				);
				setActiveBreakpoint(sortedBps[0]);
			}
		}
	}, [action, executeAction, breakPoints]);

	return (
		<div className="flex-1 flex">
			<div className="flex flex-row w-screen">
				<div className="w-15/100 bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
					<BuilderLeftSidebar />
				</div>
				<div className="w-67/100  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
					<BuilderPreview />
				</div>
				<div className="w-17/100 flex-1  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
					<BuilderRightSidebar />
				</div>
			</div>
		</div>
	);
}
