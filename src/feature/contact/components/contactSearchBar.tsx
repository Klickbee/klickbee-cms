"use client";

import { useTranslations } from "next-intl";
import SearchBar from "@/components/admin/_partials/searchBar";
import { useContactSearchStore } from "@/feature/contact/stores/storeContactSearch";

export default function ContactSearchBar() {
	const t = useTranslations("Contacts");

	return (
		<SearchBar
			placeholder={t("SearchContacts")}
			useSearchStore={useContactSearchStore}
		/>
	);
}
