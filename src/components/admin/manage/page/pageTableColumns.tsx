import { createColumnHelper } from "@tanstack/react-table";
import SeoBadge from "@/components/admin/_partials/seoBadge";
import {
	ActionConfig,
	ActionsDropdown,
} from "@/components/admin/_partials/table/actions-dropdown";
import {
	SelectColumnCell,
	SelectColumnHeader,
} from "@/components/admin/_partials/table/select-column";
import { SortableColumnHeader } from "@/components/admin/_partials/table/sortable-column-header";
import { generateAdminLink } from "@/feature/admin-key/lib/utils";
import { Page } from "@/feature/page/types/page";
import { seoScoreCalculated } from "@/feature/seo/lib/seoScoreCalculated";

const columnHelper = createColumnHelper<Page>();

export function createColumns(
	t: (key: string) => string,
	tCommon: (key: string) => string,
	onDuplicate?: (id: string) => void,
	onDelete?: (id: string) => void,
) {
	return [
		columnHelper.display({
			cell: ({ row }) => <SelectColumnCell row={row} />,
			enableHiding: false,
			enableSorting: false,
			header: ({ table }) => <SelectColumnHeader table={table} />,
			id: "select",
		}),
		columnHelper.accessor("title", {
			cell: ({ getValue }) => (
				<span className="font-medium">{getValue()}</span>
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("Name")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.accessor("slug", {
			cell: ({ getValue }) => (
				<span className="text-muted-foreground">/{getValue()}</span>
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{t("Slug")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.display({
			cell: ({ row }) => (
				<SeoBadge
					score={seoScoreCalculated({
						metaDescription: row.original.metaDescription,
						metaKeywords: row.original.metaKeywords,
						metaTitle: row.original.metaTitle,
						title: row.original.title,
					})}
				/>
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("SeoScore")}
				</SortableColumnHeader>
			),
			id: "seoScore",
		}),
		columnHelper.display({
			cell: ({ row }) => {
				const actions: ActionConfig[] = [
					{
						href: generateAdminLink("builder"),
						label: tCommon("Edit"),
						type: "edit",
					},
					{
						label: tCommon("Duplicate"),
						onClick: () => {
							onDuplicate?.(row.original.id.toString());
						},
						type: "duplicate",
					},
					{
						href: generateAdminLink(
							`manage/pages/${row.original.id}`,
						),
						label: "SEO",
						type: "seo",
					},
					{
						label: tCommon("Delete"),
						onClick: () => onDelete?.(row.original.id.toString()),
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
