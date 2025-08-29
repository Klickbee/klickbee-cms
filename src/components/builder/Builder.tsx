"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { DeleteComponentProvider } from "@/builder/contexts/DeleteComponentContext";
import BuilderHeader from "@/components/builder/ui/BuilderHeader";
import BuilderLeftSidebar from "@/components/builder/ui/BuilderLeftSidebar";
import BuilderPreview from "@/components/builder/ui/BuilderPreview";
import { Toaster } from "@/components/ui/sonner";
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
		<DeleteComponentProvider>
			<>
				<Toaster position={"bottom-center"} />
				<BuilderHeader />
				<div className={"flex flex-row w-screen"}>
					<div className="w-15/100  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
						<BuilderLeftSidebar />
					</div>
					<div className="w-70/100  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
						<BuilderPreview />
					</div>
					<div className="w-15/100  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
						{/*<BuilderRightSidebar/>*/}
					</div>
				</div>
				{/*<BuilderFloatingActions />*/}
			</>
		</DeleteComponentProvider>
	);
}
