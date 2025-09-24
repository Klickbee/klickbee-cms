"use client";

import { useTranslations } from "next-intl";
import SearchBar from "@/components/admin/_partials/searchBar";
import { usePages } from "@/feature/page/queries/usePages";
import { usePageSearchStore } from "@/feature/page/stores/storePageSearch";

export default function PageSearchBar() {
	const { data: pages } = usePages();
	const { searchQuery } = usePageSearchStore();
	const t = useTranslations("Pages");

	const hasInitialData = Array.isArray(pages) && pages.length > 0;

	if (!hasInitialData && !searchQuery) {
		return null;
	}

	return (
		<SearchBar
			placeholder={t("Search")}
			useSearchStore={usePageSearchStore}
		/>
	);
}
