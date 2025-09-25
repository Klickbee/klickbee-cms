"use client";

import { useTranslations } from "next-intl";
import EmptyState from "@/components/admin/_partials/emptyState";
import TanstackTable from "@/components/admin/_partials/table/tanstackTable";
import { useCollectionsTableContext } from "@/feature/collection/contexts/CollectionsTableContext";

export default function CollectionTable() {
	const table = useCollectionsTableContext();
	const t = useTranslations("Contents");

	if (!table.getRowModel().rows?.length) {
		return (
			<EmptyState
				description={t("NoCollectionFoundDescription")}
				title={t("NoCollectionFound")}
			/>
		);
	}

	return (
		<div className="rounded-md border">
			<TanstackTable table={table} />
		</div>
	);
}
