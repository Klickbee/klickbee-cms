import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	RowSelectionState,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface UseGenericTableOptions<TData extends { id: string | number }> {
	data: TData[];
	columns: ColumnDef<TData>[];
	searchQuery: string;
	setSelectedItems: (items: string[]) => void;
}

export function useGenericTable<TData extends { id: string | number }>({
	data,
	columns,
	searchQuery,
	setSelectedItems,
}: UseGenericTableOptions<TData>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const tableData = Array.isArray(data) ? data : [];

	const table = useReactTable({
		columns,
		data: tableData,
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowId: (row) => row.id.toString(),
		getSortedRowModel: getSortedRowModel(),
		globalFilterFn: "includesString",
		manualPagination: false,
		onColumnFiltersChange: setColumnFilters,
		onPaginationChange: setPagination,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		state: {
			columnFilters,
			globalFilter: searchQuery,
			pagination,
			rowSelection,
			sorting,
		},
	});

	// Synchroniser la sélection
	useEffect(() => {
		const selectedIds = Object.keys(rowSelection).filter(
			(id) => rowSelection[id],
		);
		setSelectedItems(selectedIds);
	}, [rowSelection, setSelectedItems]);

	return table;
}
