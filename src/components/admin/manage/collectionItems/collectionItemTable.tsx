"use client";

import { useTranslations } from "next-intl";
import EmptyState from "@/components/admin/_partials/emptyState";
import TanstackTable from "@/components/admin/_partials/table/tanstackTable";
import { useCollectionItemsTableContext } from "@/feature/collectionItem/contexts/CollectionItemsTableContext";

export default function CollectionItemTable() {
	const table = useCollectionItemsTableContext();
	const t = useTranslations("CollectionItems");

	if (!table.getRowModel().rows?.length) {
		return (
			<EmptyState
				description={t("NoCollectionItemFoundDescription")}
				title={t("NoCollectionItemFound")}
			/>
		);
	}

	return (
		<div className="rounded-md border">
			<TanstackTable table={table} />
		</div>
	);
}
