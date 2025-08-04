"use client";

import BuilderFloatingActions from "@/components/builder/ui/BuilderFloatingActions";
import BuilderHeader from "@/components/builder/ui/BuilderHeader";
import BuilderLeftSidebar from "@/components/builder/ui/BuilderLeftSidebar";
import BuilderPreview from "@/components/builder/ui/BuilderPreview";
import BuilderRightSidebar from "@/components/builder/ui/BuilderRightSidebar";
import { Toaster } from "@/components/ui/sonner";

export default function BuilderComponent() {
	return (
		<>
			<Toaster position={"bottom-center"} />
			<BuilderHeader />
			<BuilderLeftSidebar />
			{/*<BuilderPreview />*/}
			{/*<BuilderRightSidebar />*/}
			{/*<BuilderFloatingActions />*/}
		</>
	);
}
