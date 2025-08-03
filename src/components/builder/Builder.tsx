"use client";
import BuilderPreview from "@/components/builder/ui/BuilderPreview";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";

export default function BuilderComponent() {
	useCurrentPageStore.setState({ currentPage: "/" });
	return (
		<>
			<BuilderPreview />
			{/*<BuilderFloatingActions />*/}
		</>
	);
}
