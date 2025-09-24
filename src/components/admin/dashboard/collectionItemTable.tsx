"use client";

import { useTranslations } from "next-intl";
import EmptyState from "@/components/admin/_partials/emptyState";
import TanstackTable from "@/components/admin/_partials/table/tanstackTable";
import { useCollectionItemContext } from "@/feature/dashboard/contexts/collectionItemContext";

export default function CollectionItemTable() {
	const table = useCollectionItemContext();
	const t = useTranslations("Dashboard");

	if (!table.getRowModel().rows?.length) {
		return (
			<EmptyState
				buttonText={t("ContentManagerLinkText")}
				description={t("NoCollectionItemsDescription")}
				title={t("NoCollectionItemsTitle")}
			/>
		);
	}

	return (
		<div className="rounded-md border">
			<TanstackTable table={table} />
		</div>
	);
}
