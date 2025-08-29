import { useMemo, useState } from "react";
import { Page } from "@/feature/page/types/page";

export function usePageSearch(pages: Page[]) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredPages = useMemo(() => {
		if (!searchTerm.trim()) {
			return pages;
		}

		const lowerSearchTerm = searchTerm.toLowerCase();

		return pages.filter((page) => {
			return (
				page.title.toLowerCase().includes(lowerSearchTerm) ||
				page.slug.toLowerCase().includes(lowerSearchTerm) ||
				page.metaTitle?.toLowerCase().includes(lowerSearchTerm) ||
				page.metaDescription?.toLowerCase().includes(lowerSearchTerm)
			);
		});
	}, [pages, searchTerm]);

	return {
		filteredPages,
		searchTerm,
		setSearchTerm,
	};
}
