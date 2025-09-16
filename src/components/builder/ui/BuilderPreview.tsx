"use client";

import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import BuilderPreviewCanvas from "@/components/builder/ui/_partials/Preview/Canvas";

export default function BuilderPreview() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	return currentPage.id != -1 ? <BuilderPreviewCanvas /> : null;
}
