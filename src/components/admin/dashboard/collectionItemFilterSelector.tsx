"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import FilterSelector, {
	type FilterOption,
} from "@/components/admin/_partials/filterSelector";
import { useCollectionItemFilterStore } from "@/feature/dashboard/stores/storeCollectionItemSort";

export default function CollectionItemFilterSelector() {
	const t = useTranslations("Dashboard");
	const { filterBy, setFilterBy } = useCollectionItemFilterStore();

	const filterOptions: FilterOption[] = useMemo(
		() => [
			{ label: t("AllStatus"), value: "all" },
			{ label: t("PublishedStatus"), value: "Published" },
			{ label: t("DraftStatus"), value: "Draft" },
			{ label: t("PendingStatus"), value: "Pending" },
		],
		[t],
	);

	return (
		<FilterSelector
			className="[&>div]:w-[160px] [&>div]:h-9"
			onValueChange={setFilterBy}
			options={filterOptions}
			placeholder={t("FilterBy")}
			value={filterBy}
		/>
	);
}
