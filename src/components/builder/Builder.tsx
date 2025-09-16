"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import BuilderLeftSidebar from "@/components/builder/ui/BuilderLeftSidebar";
import BuilderPreview from "@/components/builder/ui/BuilderPreview";
import BuilderRightSidebar from "@/components/builder/ui/BuilderRightSidebar";
import { useAdminKey } from "@/feature/admin-key/lib/utils";
import { useAddPage } from "@/hooks/useAddPage";

export default function BuilderComponent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const adminKey = useAdminKey();
	const action = searchParams.get("action");
	const hasProcessedAction = useRef(false);
	const { addPage } = useAddPage();

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

	useEffect(() => {
		if (action && !hasProcessedAction.current) {
			executeAction(action);
		}
	}, [action, executeAction]);

	return (
		<div className="flex-1 flex">
			<div className="flex flex-row w-screen">
				<div className="flex-1 bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
					<BuilderLeftSidebar />
				</div>
				<div className="w-70/100  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
					<BuilderPreview />
				</div>
				<div className="flex-1  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
					<BuilderRightSidebar />
				</div>
			</div>
		</div>
	);
}
