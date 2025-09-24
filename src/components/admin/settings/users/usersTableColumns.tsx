import { createColumnHelper } from "@tanstack/react-table";
import {
	ActionConfig,
	ActionsDropdown,
} from "@/components/admin/_partials/table/actions-dropdown";
import { DateCell } from "@/components/admin/_partials/table/date-cell";
import {
	SelectColumnCell,
	SelectColumnHeader,
} from "@/components/admin/_partials/table/select-column";
import { SortableColumnHeader } from "@/components/admin/_partials/table/sortable-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/feature/user/types/user";

const columnHelper = createColumnHelper<User>();

export function createColumns(
	t: (key: string) => string,
	tCommon: (key: string) => string,
	locale: string,
	adminKey: string,
	onDeleteUser: (userId: string) => void,
) {
	return [
		columnHelper.display({
			cell: ({ row }) => <SelectColumnCell row={row} />,
			enableHiding: false,
			enableSorting: false,
			header: ({ table }) => <SelectColumnHeader table={table} />,
			id: "select",
		}),
		columnHelper.accessor("image", {
			cell: ({ row, getValue }) => (
				<Avatar className="h-8 w-8">
					<AvatarImage
						alt={row.original.name || ""}
						src={getValue() || ""}
					/>
					<AvatarFallback>
						{row.original.name?.charAt(0)?.toUpperCase() || "U"}
					</AvatarFallback>
				</Avatar>
			),
			enableSorting: false,
			header: t("Profile"),
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
		columnHelper.accessor("createdAt", {
			cell: ({ getValue }) => (
				<DateCell date={getValue()} locale={locale} />
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("CreatedAt")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.display({
			cell: ({ row }) => {
				const actions: ActionConfig[] = [
					{
						href: `/admin/${adminKey}/manage/settings/users/${row.original.id}`,
						label: tCommon("Edit"),
						type: "edit",
					},
					{
						label: tCommon("Delete"),
						onClick: () => onDeleteUser(row.original.id),
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
