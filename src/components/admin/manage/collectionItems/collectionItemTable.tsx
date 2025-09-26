"use client";

import { useTranslations } from "next-intl";
import EmptyState from "@/components/admin/_partials/emptyState";
import TanstackTable from "@/components/admin/_partials/table/tanstackTable";
import { useCollectionItemsTable } from "@/feature/collectionItem/hooks/useCollectionItemsTable";

interface CollectionItemTableProps {
	collectionSlug: string;
}

export default function CollectionItemTable({
	collectionSlug,
}: CollectionItemTableProps) {
	const table = useCollectionItemsTable(collectionSlug);
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
