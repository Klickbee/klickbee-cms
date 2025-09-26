"use client";

import { useTranslations } from "next-intl";
import EmptyState from "@/components/admin/_partials/emptyState";
import TanstackTable from "@/components/admin/_partials/table/tanstackTable";
import { useUsersTable } from "@/feature/user/hooks/useUsersTable";

export default function UserTable() {
	const table = useUsersTable();
	const t = useTranslations("SettingsUsers");

	if (!table.getRowModel().rows?.length) {
		return (
			<EmptyState
				description={t("NoUsersDescription")}
				title={t("NoUsersFoundTitle")}
			/>
		);
	}

	return (
		<div className="rounded-md border">
			<TanstackTable table={table} />
		</div>
	);
}
