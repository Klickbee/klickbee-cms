"use client";

import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface TanStackPaginationProps<TData> {
	table: Table<TData>;
}

export default function TanStackPagination<TData>({
	table,
}: TanStackPaginationProps<TData>) {
	const tCommon = useTranslations("Common");

	const totalPages = table.getPageCount();
	const currentPage = table.getState().pagination.pageIndex + 1;

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="flex items-center justify-between">
			<div className="text-sm text-muted-foreground">
				{tCommon("Page")} {currentPage} {tCommon("Of")} {totalPages}
			</div>

			<div className="flex items-center gap-2">
				<Button
					className="flex items-center gap-1"
					disabled={!table.getCanPreviousPage()}
					onClick={() => table.previousPage()}
					size="sm"
					variant="outline"
				>
					<ChevronLeft className="h-4 w-4" />
					{tCommon("Previous")}
				</Button>

				<Button
					className="flex items-center gap-1"
					disabled={!table.getCanNextPage()}
					onClick={() => table.nextPage()}
					size="sm"
					variant="outline"
				>
					{tCommon("Next")}
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
