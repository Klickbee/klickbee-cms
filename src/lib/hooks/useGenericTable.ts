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
import { useEffect, useRef, useState } from "react";

interface UseGenericTableOptions<TData extends { id: string | number }> {
	data: TData[];
	columns: ColumnDef<TData>[];
	searchQuery?: string;
	setSelectedItems?: (items: string[]) => void;
	selectedItems?: string[];
}

export function useGenericTable<TData extends { id: string | number }>({
	data,
	columns,
	searchQuery,
	setSelectedItems,
	selectedItems,
}: UseGenericTableOptions<TData>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const prevSelectedItemsLength = useRef<number | undefined>(undefined);

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
			globalFilter: searchQuery || "",
			pagination,
			rowSelection,
			sorting,
		},
	});

	// Synchroniser la sélection du table vers le store
	useEffect(() => {
		if (setSelectedItems) {
			const selectedIds = Object.keys(rowSelection).filter(
				(id) => rowSelection[id],
			);
			setSelectedItems(selectedIds);
		}
	}, [rowSelection, setSelectedItems]);

	// Synchroniser la sélection du store vers le table (uniquement quand selectedItems passe de >0 à 0)
	useEffect(() => {
		const currentLength = selectedItems?.length ?? 0;
		const prevLength = prevSelectedItemsLength.current ?? 0;

		// Si on avait des éléments sélectionnés et qu'on n'en a plus
		if (prevLength > 0 && currentLength === 0) {
			setRowSelection({});
		}

		prevSelectedItemsLength.current = currentLength;
	}, [selectedItems]);

	return table;
}
