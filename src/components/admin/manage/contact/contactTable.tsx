"use client";

import { useTranslations } from "next-intl";
import EmptyState from "@/components/admin/_partials/emptyState";
import TanstackTable from "@/components/admin/_partials/table/tanstackTable";
import { useContactsTableContext } from "@/feature/contact/contexts/ContactsTableContext";

export default function ContactTable() {
	const table = useContactsTableContext();
	const t = useTranslations("Contacts");

	if (!table.getRowModel().rows?.length) {
		return (
			<EmptyState
				description={t("NoContactFoundDescription")}
				title={t("NoContactFound")}
			/>
		);
	}

	return (
		<div className="rounded-md border">
			<TanstackTable table={table} />
		</div>
	);
}
