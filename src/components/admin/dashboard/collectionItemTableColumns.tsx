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
import { Badge } from "@/components/ui/badge";
import { DashboardCollectionItem } from "@/feature/dashboard/types/dashboardCollectionItem";

const columnHelper = createColumnHelper<DashboardCollectionItem>();

export function createColumns(
	t: (key: string) => string,
	tCommon: (key: string) => string,
	locale: string,
	adminKey: string,
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
		columnHelper.accessor("name", {
			cell: ({ getValue }) => (
				<span className="font-medium">{getValue()}</span>
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("Name")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.accessor("collection", {
			cell: ({ getValue }) => (
				<span className="text-muted-foreground">{getValue()}</span>
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{t("Collection")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.accessor("status", {
			cell: ({ getValue }) => {
				const status = getValue();
				const variant =
					status === "Published"
						? "default"
						: status === "Draft"
							? "secondary"
							: "outline";
				return (
					<Badge className="font-bold" variant={variant}>
						{t(
							status === "Published"
								? "PublishedStatus"
								: "DraftStatus",
						)}
					</Badge>
				);
			},
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{t("Status")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.accessor("datePost", {
			cell: ({ getValue }) => (
				<DateCell date={getValue()} locale={locale} />
			),
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{t("DatePost")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.accessor("seoScore", {
			cell: ({ getValue }) => {
				const score = getValue();
				const scoreValue = parseInt(score.replace("%", ""));

				let variant: "default" | "secondary" | "destructive";
				let className = "";

				if (scoreValue >= 80) {
					variant = "default";
					className =
						"bg-green-100 text-green-700 hover:bg-green-100";
				} else if (scoreValue >= 50) {
					variant = "secondary";
					className =
						"bg-orange-100 text-orange-700 hover:bg-orange-100";
				} else {
					variant = "destructive";
					className = "bg-red-100 text-red-700 hover:bg-red-100";
				}

				return (
					<Badge className={className} variant={variant}>
						{score}
					</Badge>
				);
			},
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{t("SeoScore")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.display({
			cell: ({ row }) => {
				const actions: ActionConfig[] = [
					{
						href: `/admin/${adminKey}/collections/${row.original.collection}/${row.original.id}`,
						label: tCommon("Edit"),
						type: "edit",
					},
					{
						href: `/admin/${adminKey}/collections/${row.original.collection}/${row.original.id}/preview`,
						label: "Preview",
						target: "_blank",
						type: "preview",
					},
					{
						label: "Duplicate",
						onClick: () =>
							onDuplicate?.(row.original.id.toString()),
						type: "duplicate",
					},
					{
						href: `/admin/${adminKey}/collections/${row.original.collection}/${row.original.id}/seo`,
						label: "SEO",
						type: "seo",
					},
					{
						className: "text-destructive",
						label: "Delete",
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
