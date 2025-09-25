"use client";

import { useTranslations } from "next-intl";
import SearchBar from "@/components/admin/_partials/searchBar";
import { useCollectionSearchStore } from "@/feature/collection/stores/storeCollectionSearch";

export default function CollectionSearchBar() {
	const t = useTranslations("Contents");

	return (
		<SearchBar
			placeholder={t("SearchCollections")}
			useSearchStore={useCollectionSearchStore}
		/>
	);
}
