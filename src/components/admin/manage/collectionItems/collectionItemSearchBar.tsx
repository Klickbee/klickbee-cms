"use client";

import { useTranslations } from "next-intl";
import SearchBar from "@/components/admin/_partials/searchBar";
import { useCollectionItemSearchStore } from "@/feature/collection/stores/storeCollectionItemSearch";

export default function CollectionItemSearchBar() {
	const t = useTranslations("CollectionItems");

	return (
		<SearchBar
			placeholder={t("SearchCollectionItems")}
			useSearchStore={useCollectionItemSearchStore}
		/>
	);
}
