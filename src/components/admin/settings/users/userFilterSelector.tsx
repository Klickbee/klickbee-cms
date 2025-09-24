"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import FilterSelector, {
	FilterOption,
} from "@/components/admin/_partials/filterSelector";
import {
	type UserFilterType,
	useUserFilterStore,
} from "@/feature/user/stores/storeUserSort";

export default function UserFilterSelector() {
	const t = useTranslations("SettingsUsers");
	const { filterBy, setFilterBy } = useUserFilterStore();

	const filterOptions: FilterOption<UserFilterType>[] = useMemo(
		() => [
			{ label: t("AllUsers"), value: "all" },
			{ label: t("ActiveUsers"), value: "active" },
			{ label: t("InactiveUsers"), value: "inactive" },
			{ label: t("AdminUsers"), value: "admin" },
			{ label: t("RegularUsers"), value: "user" },
		],
		[t],
	);

	return (
		<FilterSelector
			className="[&>div]:w-[180px] [&>div]:h-9"
			onValueChange={setFilterBy}
			options={filterOptions}
			placeholder={t("FilterBy")}
			value={filterBy}
		/>
	);
}
