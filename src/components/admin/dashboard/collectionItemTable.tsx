"use client";

import { flexRender } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import EmptyState from "@/components/admin/manage/EmptyState";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
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
