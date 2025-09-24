"use client";

import { useTranslations } from "next-intl";
import SearchBar from "@/components/admin/_partials/searchBar";
import { useAllCollectionItems } from "@/feature/dashboard/queries/useAllCollectionItems";
import { useCollectionItemSearchStore } from "@/feature/dashboard/stores/storeCollectionItemSearch";

export default function CollectionItemSearchBar() {
	const { data: collectionItems } = useAllCollectionItems();
	const { searchQuery } = useCollectionItemSearchStore();
	const t = useTranslations("Dashboard");

	const hasInitialData =
		Array.isArray(collectionItems) && collectionItems.length > 0;

	if (!hasInitialData && !searchQuery) {
		return null;
	}

	return (
		<SearchBar
			placeholder={t("SearchCollectionItems")}
			useSearchStore={useCollectionItemSearchStore}
		/>
	);
}
