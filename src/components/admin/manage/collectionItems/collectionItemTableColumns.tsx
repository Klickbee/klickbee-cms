import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import {
	ActionConfig,
	ActionsDropdown,
} from "@/components/admin/_partials/table/actions-dropdown";
import {
	SelectColumnCell,
	SelectColumnHeader,
} from "@/components/admin/_partials/table/select-column";
import { SortableColumnHeader } from "@/components/admin/_partials/table/sortable-column-header";
import { Badge } from "@/components/ui/badge";
import { CollectionItem } from "@/feature/collection/types/collection";
import { seoScoreCalculated } from "@/feature/seo/lib/seoScoreCalculated";

const columnHelper = createColumnHelper<CollectionItem>();

const statusColors = {
	Draft: "bg-gray-200 text-gray-600",
	Published: "bg-green-100 text-green-700",
	Scheduled: "bg-blue-100 text-blue-700",
} as const;

export function createCollectionItemColumns(
	t: (key: string) => string,
	tCommon: (key: string) => string,
	locale: string,
	adminKey: string,
	collectionSlug: string,
	onDeleteItem?: (itemId: number) => void,
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
			cell: ({ getValue }) => <span>{getValue()}</span>,
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("Title")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.accessor("slug", {
			cell: ({ getValue }) => <span>{getValue()}</span>,
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("URL")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.display({
			cell: ({ row }) => {
				const item = row.original;
				const itemStatus = item.isPublished
					? item.publishedAt &&
						new Date(item.publishedAt) > new Date()
						? "Scheduled"
						: "Published"
					: "Draft";

				return (
					<span
						className={`text-xs px-2 py-1 rounded ${statusColors[itemStatus as keyof typeof statusColors]}`}
					>
						{t(itemStatus)}
					</span>
				);
			},
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("Status")}
				</SortableColumnHeader>
			),
			id: "status",
		}),
		columnHelper.accessor("createdAt", {
			cell: ({ getValue }) => {
				const date = getValue();
				return date ? format(new Date(date), "MMM dd, yyyy") : "";
			},
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("CreatedAt")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.accessor("updatedAt", {
			cell: ({ getValue }) => {
				const date = getValue();
				return date ? format(new Date(date), "MMM dd, yyyy") : "";
			},
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("UpdatedAt")}
				</SortableColumnHeader>
			),
		}),
		columnHelper.display({
			cell: ({ row }) => {
				const item = row.original;
				const seoScore = seoScoreCalculated({
					metaDescription: item.metaDescription,
					metaKeywords: item.metaKeywords,
					metaTitle: item.metaTitle,
					title: item.title,
				});

				return (
					<Badge
						className={
							seoScore === 100
								? "bg-green-100 text-green-700"
								: "bg-yellow-100 text-yellow-800"
						}
					>
						{seoScore}%
					</Badge>
				);
			},
			header: ({ column }) => (
				<SortableColumnHeader column={column}>
					{tCommon("SeoScore")}
				</SortableColumnHeader>
			),
			id: "seo",
		}),
		columnHelper.display({
			cell: ({ row }) => {
				const actions: ActionConfig[] = [
					{
						href: `/admin/${adminKey}/manage/content/${collectionSlug}/items/${row.original.slug}`,
						label: t("EditItem"),
						type: "edit",
					},
				];

				if (onDeleteItem) {
					actions.push({
						label: tCommon("Delete"),
						onClick: () => onDeleteItem(row.original.id),
						type: "delete",
					});
				}

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
