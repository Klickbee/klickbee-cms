"use client";

import { DeleteComponentProvider } from "@/builder/contexts/DeleteComponentContext";
import BuilderHeader from "@/components/builder/ui/BuilderHeader";
import BuilderLeftSidebar from "@/components/builder/ui/BuilderLeftSidebar";
import BuilderPreview from "@/components/builder/ui/BuilderPreview";
import { Toaster } from "@/components/ui/sonner";

export default function BuilderComponent() {
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
