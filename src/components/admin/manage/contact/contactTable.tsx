"use client";

import {flexRender} from "@tanstack/react-table";
import {useTranslations} from "next-intl";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {useContactsTableContext} from "@/feature/contact/contexts/ContactsTableContext";
import EmptyState from "@/components/admin/manage/EmptyState";

export default function ContactsTable() {
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
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow
							data-state={row.getIsSelected() && "selected"}
							key={row.id}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext(),
									)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
