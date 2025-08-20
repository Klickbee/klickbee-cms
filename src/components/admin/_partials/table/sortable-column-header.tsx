import { Column } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortableColumnHeaderProps<T> {
	column: Column<T, unknown>;
	children: React.ReactNode;
}

export function SortableColumnHeader<T>({
	column,
	children,
}: SortableColumnHeaderProps<T>) {
	return (
		<Button
			className="p-0 h-auto font-semibold"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			variant="ghost"
		>
			{children}
			<span className="ml-2 w-4 h-4 inline-flex items-center justify-center">
				{column.getIsSorted() === "asc" ? (
					<ChevronUpIcon className="h-4 w-4" />
				) : column.getIsSorted() === "desc" ? (
					<ChevronDownIcon className="h-4 w-4" />
				) : null}
			</span>
		</Button>
	);
}
