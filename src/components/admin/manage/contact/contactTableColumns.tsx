import { createColumnHelper } from "@tanstack/react-table";
import {
	ActionConfig,
	ActionsDropdown,
} from "@/components/admin/_partials/table/actions-dropdown";
import { DateCell } from "@/components/admin/_partials/table/date-cell";
import { FormattedIdLink } from "@/components/admin/_partials/table/formatted-id-link";
import {
	SelectColumnCell,
	SelectColumnHeader,
} from "@/components/admin/_partials/table/select-column";
import { SortableColumnHeader } from "@/components/admin/_partials/table/sortable-column-header";
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
			cell: ({ row }) => {
				const actions: ActionConfig[] = [
					{
						href: `/admin/${adminKey}/manage/contact/${row.original.id}`,
						label: t("ViewContact"),
						type: "preview",
					},
					{
						label: tCommon("Delete"),
						onClick: () => onDeleteContact(row.original.id),
						type: "delete",
					},
				];

				return (
					<ActionsDropdown
						actions={actions}
						row={row}
						tCommon={tCommon}
					/>
				);
			},
			header: "",
			id: "actions",
		}),
	];
}
