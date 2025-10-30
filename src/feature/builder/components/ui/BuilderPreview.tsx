"use client";

import BuilderPreviewCanvas from "@/feature/builder/components/ui/_partials/Preview/Canvas";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";

export default function BuilderPreview() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	return currentPage.id != -1 ? <BuilderPreviewCanvas /> : null;
}
