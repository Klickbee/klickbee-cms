"use client";

import { useTranslations } from "next-intl";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCollectionItemSortStore } from "@/feature/dashboard/stores/storeCollectionItemSort";

export default function CollectionItemSortSelector() {
	const t = useTranslations("Dashboard");
	const { sortBy, setSortBy } = useCollectionItemSortStore();

	return (
		<Select onValueChange={setSortBy} value={sortBy}>
			<SelectTrigger className="w-[160px] h-9">
				<SelectValue placeholder={t("SortBy")} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">{t("AllStatus")}</SelectItem>
				<SelectItem value="Published">
					{t("PublishedStatus")}
				</SelectItem>
				<SelectItem value="Draft">{t("DraftStatus")}</SelectItem>
			</SelectContent>
		</Select>
	);
}
