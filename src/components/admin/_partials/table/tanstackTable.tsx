import {
	Cell,
	flexRender,
	Header,
	HeaderGroup,
	Row,
	RowData,
	Table as TableType,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface TanstackTableProps<TData extends RowData> {
	table: TableType<TData>;
}

export default function TanstackTable<TData extends RowData>({
	table,
}: TanstackTableProps<TData>) {
	return (
		<Table>
			<TableHeader>
				{table
					.getHeaderGroups()
					.map((headerGroup: HeaderGroup<TData>) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(
								(header: Header<TData, unknown>) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext(),
												)}
									</TableHead>
								),
							)}
						</TableRow>
					))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows.map((row: Row<TData>) => (
					<TableRow
						data-state={row.getIsSelected() && "selected"}
						key={row.id}
					>
						{row
							.getVisibleCells()
							.map((cell: Cell<TData, unknown>) => (
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
	);
}
