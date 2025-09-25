import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import {
	ActionConfig,
	ActionsDropdown,
} from "@/components/admin/_partials/table/actions-dropdown";
import {
	SelectColumnCell,
	SelectColumnHeader,
} from "@/components/admin/_partials/table/select-column";
import { SortableColumnHeader } from "@/components/admin/_partials/table/sortable-column-header";
import { CollectionWithTemplates } from "@/feature/collection/types/collection";

const columnHelper = createColumnHelper<CollectionWithTemplates>();

export function createColumns(
	t: (key: string) => string,
	tCommon: (key: string) => string,
	onDeleteCollection: (collectionId: number) => void,
	onDuplicateCollection: (collectionId: number) => void,
	onRenameCollection: (collectionId: number) => void,
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
		columnHelper.accessor("name", {
			cell: ({ getValue, row }) => (
				<Link
					className="cursor-pointer hover:text-blue-600 transition-colors"
					href={`/admin/${adminKey}/manage/content/items/${row.original.slug}`}
				>
					{getValue() || t("NameNotAvailable")}
				</Link>
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{t("CollectionName")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.accessor("items", {
			cell: ({ getValue }) => (
				<span className="text-center">{getValue()?.length || 0}</span>
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{t("NumberOfItems")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.display({
			cell: ({ row }) => {
				const actions: ActionConfig[] = [
					{
						href: `/admin/${adminKey}/manage/content/${row.original.slug}/edit`,
						label: tCommon("Edit"),
						type: "edit",
					},
					{
						label: tCommon("Duplicate"),
						onClick: () => onDuplicateCollection(row.original.id),
						type: "duplicate",
					},
					{
						label: t("Rename"),
						onClick: () => onRenameCollection(row.original.id),
						type: "edit",
					},
					{
						label: tCommon("Delete"),
						onClick: () => onDeleteCollection(row.original.id),
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
