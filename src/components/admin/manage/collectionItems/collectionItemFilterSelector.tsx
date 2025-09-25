"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import FilterSelector, {
	FilterOption,
} from "@/components/admin/_partials/filterSelector";
import {
	type CollectionItemFilterType,
	useCollectionItemFilterStore,
} from "@/feature/collection/stores/storeCollectionItemFilter";

export default function CollectionItemFilterSelector() {
	const t = useTranslations("CollectionItems");
	const { filterBy, setFilterBy } = useCollectionItemFilterStore();

	const filterOptions: FilterOption<CollectionItemFilterType>[] = useMemo(
		() => [
			{ label: t("AllStatus"), value: "all" },
			{ label: t("Published"), value: "published" },
			{ label: t("Draft"), value: "draft" },
			{ label: t("Scheduled"), value: "scheduled" },
		],
		[t],
	);

	return (
		<FilterSelector
			className="[&>div]:w-[180px] [&>div]:h-9"
			onValueChange={setFilterBy}
			options={filterOptions}
			placeholder={t("FilterByStatus")}
			value={filterBy}
		/>
	);
}
