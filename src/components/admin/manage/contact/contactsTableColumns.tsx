import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { ActionsDropdown } from "@/components/admin/_partials/table/actions-dropdown";
import { DateCell } from "@/components/admin/_partials/table/date-cell";
import { FormattedIdLink } from "@/components/admin/_partials/table/formatted-id-link";
import {
	SelectColumnCell,
	SelectColumnHeader,
} from "@/components/admin/_partials/table/select-column";
import { SortableColumnHeader } from "@/components/admin/_partials/table/sortable-column-header";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Contact } from "@/feature/contact/types/contact";

const columnHelper = createColumnHelper<Contact>();

export function createColumns(
	t: (key: string) => string,
	tCommon: (key: string) => string,
	locale: string,
	onDeleteContact: (contactId: number) => void,
	adminKey: string,
) {
	return [
		columnHelper.display({
			cell: ({ row }) => <SelectColumnCell row={row} />,
			enableHiding: false,
			enableSorting: false,
			header: ({ table }) => <SelectColumnHeader table={table} />,
			id: "select",
		}),
		columnHelper.accessor("id", {
			cell: ({ getValue, row }) => (
				<FormattedIdLink
					href={`/admin/${adminKey}/manage/contact/${row.original.id}`}
					id={getValue()}
				/>
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("Number")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.accessor("name", {
			cell: ({ getValue }) => (
				<span>{getValue() || t("NameNotAvailable")}</span>
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("Name")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.accessor("submitDate", {
			cell: ({ getValue }) => (
				<DateCell date={getValue()} locale={locale} />
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{t("SubmitDate")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.display({
			cell: ({ row }) => (
				<ActionsDropdown
					deleteDescription={t("DeleteContactDescription")}
					deleteTitle={t("DeleteContactTitle")}
					onDelete={onDeleteContact}
					row={row}
					tCommon={tCommon}
				>
					<DropdownMenuItem asChild>
						<Link
							href={`/admin/${adminKey}/manage/contact/${row.original.id}`}
						>
							<Eye className="mr-2 h-4 w-4" />
							{t("ViewContact")}
						</Link>
					</DropdownMenuItem>
				</ActionsDropdown>
			),
			header: "",
			id: "actions",
		}),
	];
}
