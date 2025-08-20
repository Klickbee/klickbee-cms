"use client";

import { format } from "date-fns";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Usable, useEffect, useState } from "react";
import { toast } from "sonner";
import CardTitle from "@/components/admin/manage/CardTitle";
import BulkActions from "@/components/admin/manage/content/BulkActions";
import DefaultHeader from "@/components/admin/manage/DefaultHeader";
import EmptyStateComponent from "@/components/admin/manage/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getCollectionBySlug } from "@/feature/collection/actions/collectionActions";
import {
	deleteCollectionItemAction,
	getCollectionItemsBySlug,
} from "@/feature/collection/actions/collectionItemsActions";
import { CollectionItem } from "@/feature/collection/types/collection";

type statusColor = {
	Published: string;
	Scheduled: string;
	Draft: string;
};
const statusColor: statusColor = {
	Draft: "bg-gray-200 text-gray-600",
	Published: "bg-green-100 text-green-700",
	Scheduled: "bg-blue-100 text-blue-700",
};

export default function AdminContentItemsPage({
	params,
}: {
	params: Usable<unknown>;
}) {
	const paramsSynced = React.use(params) as {
		collection: string;
		adminKey: string;
	};
	const router = useRouter();
	const [statusFilter, setStatusFilter] = useState<string>("All");
	const [search, setSearch] = useState<string>("");
	const [collectionItems, setCollectionItems] = useState<CollectionItem[]>(
		[],
	);
	const [collectionName, setCollectionName] = useState<string | undefined>(
		"",
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] =
		useState<boolean>(false);
	const [isDeletingMultipleItems, setIsDeletingMultipleItems] =
		useState<boolean>(false);

	const [checkedRows, setCheckedRows] = useState<number[]>([]);
	const allIds = collectionItems?.map((c) => c.id) || [];
	const allChecked =
		checkedRows.length === allIds.length && allIds.length > 0;

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				setError(null);
				const items = await getCollectionItemsBySlug(
					paramsSynced.collection,
				);
				setCollectionItems(items);
				const collection = await getCollectionBySlug(
					paramsSynced.collection,
				);
				setCollectionName(collection?.name);
			} catch (err) {
				console.error("Error fetching collection items:", err);
				setError("Failed to load collection items");
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, [paramsSynced.collection]);

	const handleHeaderCheck = (checked: boolean) => {
		setCheckedRows(checked ? allIds : []);
	};

	const filteredData = collectionItems.filter((item) => {
		const itemStatus = item.isPublished
			? item.publishedAt && new Date(item.publishedAt) > new Date()
				? "Scheduled"
				: "Published"
			: "Draft";

		return (
			(statusFilter === "All" || itemStatus === statusFilter) &&
			item.title.toLowerCase().includes(search.toLowerCase())
		);
	});

	const handleRowCheck = (id: number, checked: boolean) => {
		setCheckedRows((prev) =>
			checked ? [...prev, id] : prev.filter((rowId) => rowId !== id),
		);
	};

	const handleBulkDelete = async () => {
		setIsDeletingMultipleItems(true);
		try {
			// Store the number of items to be deleted
			const itemsCount = checkedRows.length;

			// Delete collection items one by one
			for (const id of checkedRows) {
				await deleteCollectionItemAction(id, paramsSynced.collection);
			}
			setIsBulkDeleteDialogOpen(false);
			setCheckedRows([]);
			toast.success(`${itemsCount} items deleted successfully`);

			// Refresh the collection items
			const items = await getCollectionItemsBySlug(
				paramsSynced.collection,
			);
			setCollectionItems(items);
		} catch (error) {
			toast.error("Failed to delete items");
			console.error(error);
		} finally {
			setIsDeletingMultipleItems(false);
		}
	};

	return (
		<>
			<DefaultHeader
				className={"flex flex-row items-center justify-start gap-8"}
				description="View and manage all posts in this collection."
				title={`Contents Manager / ${collectionName}`}
			>
				<Button
					className={
						"group bg-background border gap-8 px-3 hover:bg-foreground group:text-primary group-hover:text-secondary"
					}
				>
					<Link
						href={`/admin/${paramsSynced.adminKey}/manage/content`}
					>
						<ChevronLeft
							className={
								"text-primary group-hover:text-secondary"
							}
						/>
					</Link>
				</Button>
			</DefaultHeader>

			<Card className={"mx-8 my-6 p-0 gap-0 pb-4"}>
				<CardHeader className={"border-b [.border-b]:pb-3 p-3 gap-0"}>
					<div className="flex flex-row items-center justify-between">
						<CardTitle>{collectionName}</CardTitle>
						<BulkActions
							checkedRows={checkedRows}
							collectionsLength={collectionItems?.length || 0}
							onBulkDelete={() => setIsBulkDeleteDialogOpen(true)}
							onCreate={() =>
								router.push(
									`/admin/${paramsSynced.adminKey}/manage/content/${paramsSynced.collection}/create`,
								)
							}
						/>
					</div>
				</CardHeader>
				<CardContent className={"px-3"}>
					<div
						className={
							"py-4 flex flex-row items-center justify-between gap-4"
						}
					>
						<Input
							className="w-1/3"
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search"
							value={search}
						/>
						<Select
							onValueChange={setStatusFilter}
							value={statusFilter}
						>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="All Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="All">All Status</SelectItem>
								<SelectItem value="Published">
									Published
								</SelectItem>
								<SelectItem value="Scheduled">
									Scheduled
								</SelectItem>
								<SelectItem value="Draft">Draft</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<ScrollArea className="rounded-md border">
						{isLoading ? (
							<div className="p-8 text-center">
								Loading collection items...
							</div>
						) : error ? (
							<div className="p-8 text-center text-destructive">
								{error}
							</div>
						) : filteredData.length === 0 ? (
							<EmptyStateComponent
								buttonText={`Create New ${collectionName} Item`}
								description={
									"Organize your content easily with collections. Group similar pages, posts, or " +
									"products to manage them more efficiently — all in one place."
								}
								onButtonClick={() =>
									router.push(
										`/admin/${paramsSynced.adminKey}/manage/content/${paramsSynced.collection}/create`,
									)
								}
								title={`You've didn't created any ${collectionName} items yet.`}
							/>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											<Checkbox
												checked={allChecked}
												onCheckedChange={
													handleHeaderCheck
												}
											/>
										</TableHead>
										<TableHead>Title</TableHead>
										<TableHead>URL</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Created</TableHead>
										<TableHead>Updated</TableHead>
										<TableHead>SEO</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredData.map((item) => {
										const itemStatus = item.isPublished
											? item.publishedAt &&
												new Date(item.publishedAt) >
													new Date()
												? "Scheduled"
												: "Published"
											: "Draft";

										// Calculate SEO score based on meta fields
										const seoFields = [
											item.metaTitle,
											item.metaDescription,
											item.metaKeywords,
										];
										const filledFields = seoFields.filter(
											(field) =>
												field && field.trim() !== "",
										).length;
										const seoScore =
											Math.round(
												(filledFields /
													seoFields.length) *
													100,
											) + "%";

										return (
											<TableRow key={item.id}>
												<TableCell>
													<Checkbox
														checked={checkedRows.includes(
															item.id,
														)}
														onCheckedChange={(
															checked: boolean,
														) =>
															handleRowCheck(
																item.id,
																checked,
															)
														}
													/>
												</TableCell>
												<TableCell>
													{item.title}
												</TableCell>
												<TableCell>
													{item.slug}
												</TableCell>
												<TableCell>
													<span
														className={`text-xs px-2 py-1 rounded ${statusColor[itemStatus as keyof statusColor]}`}
													>
														{itemStatus}
													</span>
												</TableCell>
												<TableCell>
													{format(
														new Date(
															item.createdAt,
														),
														"MMM dd, yyyy",
													)}
												</TableCell>
												<TableCell>
													{format(
														new Date(
															item.updatedAt,
														),
														"MMM dd, yyyy",
													)}
												</TableCell>
												<TableCell>
													<Badge
														className={
															seoScore === "100%"
																? "bg-green-100 text-green-700"
																: "bg-yellow-100 text-yellow-800"
														}
													>
														{seoScore}
													</Badge>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						)}
					</ScrollArea>
				</CardContent>
			</Card>

			{/* Bulk Delete Items Confirmation Dialog */}
			<Dialog
				onOpenChange={setIsBulkDeleteDialogOpen}
				open={isBulkDeleteDialogOpen}
			>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Delete Multiple Items</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete {checkedRows.length}{" "}
							items? This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							onClick={() => setIsBulkDeleteDialogOpen(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button
							disabled={isDeletingMultipleItems}
							onClick={handleBulkDelete}
							variant="destructive"
						>
							{isDeletingMultipleItems && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Delete {checkedRows.length} Items
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
