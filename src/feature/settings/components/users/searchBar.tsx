"use client";

import { useTranslations } from "next-intl";
import SearchBar from "@/components/admin/_partials/searchBar";
import { useUserSearchStore } from "@/feature/user/stores/storeUserSearch";

export default function UserSearchBar() {
	const t = useTranslations("SettingsUsers");

	return (
		<SearchBar
			placeholder={t("SearchUsers")}
			useSearchStore={useUserSearchStore}
		/>
	);
}
