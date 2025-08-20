import { Row, Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

interface SelectColumnCellProps<T> {
	row: Row<T>;
}

interface SelectColumnHeaderProps<T> {
	table: Table<T>;
}

export function SelectColumnCell<T>({ row }: SelectColumnCellProps<T>) {
	return (
		<Checkbox
			aria-label="Select row"
			checked={row.getIsSelected()}
			onCheckedChange={(value) => row.toggleSelected(!!value)}
		/>
	);
}

export function SelectColumnHeader<T>({ table }: SelectColumnHeaderProps<T>) {
	return (
		<Checkbox
			aria-label="Select all"
			checked={
				table.getIsAllPageRowsSelected() ||
				(table.getIsSomePageRowsSelected() && "indeterminate")
			}
			onCheckedChange={(value) =>
				table.toggleAllPageRowsSelected(!!value)
			}
		/>
	);
}
