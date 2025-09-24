"use client";

import { useTranslations } from "next-intl";
import EmptyState from "@/components/admin/_partials/emptyState";
import TanstackTable from "@/components/admin/_partials/table/tanstackTable";
import { usePagesTableContext } from "@/feature/page/contexts/pagesTableContext";

export default function PageTable() {
	const table = usePagesTableContext();
	const t = useTranslations("Pages");

	if (!table.getRowModel().rows?.length) {
		return (
			<EmptyState
				buttonText={t("CreateNew")}
				description={t("NoPagesDescription")}
				title={t("NoPagesTitle")}
			/>
		);
	}

	return (
		<div className="rounded-md border">
			<TanstackTable table={table} />
		</div>
	);
}
