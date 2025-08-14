"use client";

import { Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DefaultCardTitle from "@/components/admin/manage/CardTitle";
import BulkActions from "@/components/admin/manage/content/BulkActions";
import DefaultHeader from "@/components/admin/manage/DefaultHeader";
import EmptyStateComponent from "@/components/admin/manage/EmptyState";
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { generateAdminLink } from "@/feature/admin-key/lib/utils";
import { handleCreateCollection } from "@/feature/collection/handlers/handleCreateCollection";
import {
	useCollections,
	useCreateCollection,
	useDeleteCollection,
	useUpdateCollection,
} from "@/feature/collection/queries/useCollections";
import { Collection } from "@/feature/collection/types/collection";
import { slugify } from "@/lib/utils";

export default function AdminContentPage() {
	const { data: collections, isLoading, error } = useCollections();
	const [newCollection, setNewCollection] = useState({ name: "", slug: "" });
	const [editCollection, setEditCollection] = useState({
		id: 0,
		name: "",
		slug: "",
	});
	const [isCreatingCollection, setIsCreatingCollection] = useState(false);
	const [isCreatingCollectionLoading, setIsCreatingCollectionLoading] =
		useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
	const [collectionToDelete, setCollectionToDelete] = useState<number | null>(
		null,
	);
	const [isUpdatingCollection, setIsUpdatingCollection] = useState(false);
	const [isDeletingCollection, setIsDeletingCollection] = useState(false);
	const [isDeletingMultipleCollections, setIsDeletingMultipleCollections] =
		useState(false);
	const [checkedRows, setCheckedRows] = useState<number[]>([]);
	const createCollectionMutation = useCreateCollection();
	const updateCollectionMutation = useUpdateCollection();
	const deleteCollectionMutation = useDeleteCollection();

	const allIds = collections?.map((c) => c.id) || [];
	const allChecked =
		checkedRows.length === allIds.length && allIds.length > 0;

	const handleCreate = () => {
		handleCreateCollection(
			{
				name: newCollection.name,
				slug: newCollection.slug,
			},
			setIsCreatingCollectionLoading,
			setNewCollection,
			createCollectionMutation,
		).then(() => {
			setIsCreatingCollection(false);
		});
	};

	const handleUpdate = async () => {
		if (!editCollection.name || !editCollection.slug) {
			toast.error("Name and slug are required");
			return;
		}

		setIsUpdatingCollection(true);
		try {
			await updateCollectionMutation.mutateAsync({
				data: {
					name: editCollection.name,
					slug: slugify(editCollection.slug),
				},
				id: editCollection.id,
			});
			setIsEditDialogOpen(false);
			toast.success("Collection updated successfully");
		} catch (error) {
			toast.error("Failed to update collection");
			console.error(error);
		} finally {
			setIsUpdatingCollection(false);
		}
	};

	const handleDelete = async (id: number) => {
		setIsDeletingCollection(true);
		try {
			await deleteCollectionMutation.mutateAsync(id);
			setIsDeleteDialogOpen(false);
			setCollectionToDelete(null);
			toast.success("Collection deleted successfully");
		} catch (error) {
			toast.error("Failed to delete collection");
			console.error(error);
		} finally {
			setIsDeletingCollection(false);
		}
	};

	const handleBulkDelete = async () => {
		setIsDeletingMultipleCollections(true);
		try {
			// Delete collections one by one
			for (const id of checkedRows) {
				await deleteCollectionMutation.mutateAsync(id);
			}
			setIsBulkDeleteDialogOpen(false);
			setCheckedRows([]);
			toast.success(
				`${checkedRows.length} collections deleted successfully`,
			);
		} catch (error) {
			toast.error("Failed to delete collections");
			console.error(error);
		} finally {
			setIsDeletingMultipleCollections(false);
		}
	};

	const openEditDialog = (collection: Collection) => {
		setEditCollection({
			id: collection.id,
			name: collection.name,
			slug: collection.slug,
		});
		setIsEditDialogOpen(true);
	};

	const openDeleteDialog = (id: number) => {
		setCollectionToDelete(id);
		setIsDeleteDialogOpen(true);
	};

	const handleHeaderCheck = (checked: boolean) => {
		setCheckedRows(checked ? allIds : []);
	};
	const handleRowCheck = (id: number, checked: boolean) => {
		setCheckedRows((prev) =>
			checked ? [...prev, id] : prev.filter((rowId) => rowId !== id),
		);
	};

	return (
		<div className="flex flex-col divide-y">
			<DefaultHeader
				description={"Manage all the pages of your site."}
				title={"Contents Manager"}
			/>
			<div className={"p-6"}>
				<Card className={"gap-0 p-4"}>
					<CardHeader className={"p-3"}>
						<div
							className={
								"flex flex-row justify-between items-center"
							}
						>
							<DefaultCardTitle>Collections</DefaultCardTitle>
							<BulkActions
								checkedRows={checkedRows}
								collectionsLength={collections?.length || 0}
								onBulkDelete={() =>
									setIsBulkDeleteDialogOpen(true)
								}
								onCreate={() => setIsCreatingCollection(true)}
							/>
						</div>
					</CardHeader>

					{/* Loading state */}
					{isLoading ? (
						<div className="flex justify-center items-center h-40">
							<Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
						</div>
					) : error ? (
						<div className="flex justify-center items-center h-40 text-destructive">
							Error loading collections
						</div>
					) : collections?.length === 0 ? (
						<EmptyStateComponent
							buttonText="Create New Collection"
							description="Organize your content easily with collections. Group similar pages, posts, or products to manage them more efficiently — all in one place."
							onButtonClick={() => setIsCreatingCollection(true)}
							title="You don't have any collections yet"
						/>
					) : (
						<CardContent className={"p-0"}>
							<div className="border rounded-md p-4">
								{/* Search input */}
								<div className={"py-4 w-5/20"}>
									<Input placeholder="Search" />
								</div>

								{/* Table */}
								<div className="overflow-x-auto border rounded-md">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className="w-12">
													<Checkbox
														checked={allChecked}
														onCheckedChange={
															handleHeaderCheck
														}
													/>
												</TableHead>
												<TableHead>
													Collection Name ⬍
												</TableHead>
												<TableHead>Base URL</TableHead>
												<TableHead className="text-right">
													Number of Items
												</TableHead>
												<TableHead className="w-12"></TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{collections?.map((collection) => (
												<TableRow key={collection.id}>
													<TableCell>
														<Checkbox
															checked={checkedRows.includes(
																collection.id,
															)}
															onCheckedChange={(
																checked: boolean,
															) =>
																handleRowCheck(
																	collection.id,
																	checked,
																)
															}
														/>
													</TableCell>
													<TableCell
														className={"w-4/10"}
													>
														<a
															className="flex items-center space-x-2"
															href={generateAdminLink(
																`/manage/content/${collection.slug}`,
															)}
														>
															{collection.name}
														</a>
													</TableCell>
													<TableCell>
														{collection.slug}
													</TableCell>
													<TableCell className="text-center w-1/15">
														{collection.items
															?.length || 0}
													</TableCell>
													<TableCell
														className={"w-fit"}
													>
														<DropdownMenu>
															<DropdownMenuTrigger
																asChild
															>
																<Button
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem
																	onClick={() =>
																		openEditDialog(
																			collection,
																		)
																	}
																>
																	<Pencil className="h-4 w-4 mr-2" />
																	Edit
																</DropdownMenuItem>
																<DropdownMenuItem
																	className="text-destructive"
																	onClick={() =>
																		openDeleteDialog(
																			collection.id,
																		)
																	}
																>
																	<Trash2 className="h-4 w-4 mr-2" />
																	Delete
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>

								{/* Footer */}
								<div className="p-4 flex items-center justify-between text-sm text-muted-foreground">
									<p>{`${checkedRows.length} of ${collections?.length || 0} row(s) selected.`}</p>
									<div className="flex items-center space-x-6 lg:space-x-8">
										<div className="flex items-center space-x-2">
											<Button variant="outline">
												Previous
											</Button>
											<Button variant="outline">
												Next
											</Button>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					)}
				</Card>
			</div>

			{/* Edit Collection Dialog */}
			<Dialog onOpenChange={setIsEditDialogOpen} open={isEditDialogOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Edit Collection</DialogTitle>
						<DialogDescription>
							Update the collection details.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<label
								className="text-sm font-medium"
								htmlFor="edit-name"
							>
								Collection Name
							</label>
							<Input
								id="edit-name"
								onChange={(e) =>
									setEditCollection({
										...editCollection,
										name: e.target.value,
									})
								}
								placeholder="Enter collection name"
								value={editCollection.name}
							/>
						</div>
						<div className="grid gap-2">
							<label
								className="text-sm font-medium"
								htmlFor="edit-slug"
							>
								Slug
							</label>
							<Input
								id="edit-slug"
								onChange={(e) =>
									setEditCollection({
										...editCollection,
										slug: e.target.value,
									})
								}
								placeholder="Enter collection slug"
								value={editCollection.slug}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							disabled={isUpdatingCollection}
							onClick={handleUpdate}
							type="submit"
						>
							{isUpdatingCollection && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Update Collection
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Collection Confirmation Dialog */}
			<Dialog
				onOpenChange={setIsDeleteDialogOpen}
				open={isDeleteDialogOpen}
			>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Delete Collection</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this collection?
							This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							onClick={() => setIsDeleteDialogOpen(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button
							disabled={isDeletingCollection}
							onClick={() =>
								collectionToDelete &&
								handleDelete(collectionToDelete)
							}
							variant="destructive"
						>
							{isDeletingCollection && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Bulk Delete Collections Confirmation Dialog */}
			<Dialog
				onOpenChange={setIsBulkDeleteDialogOpen}
				open={isBulkDeleteDialogOpen}
			>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Delete Multiple Collections</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete {checkedRows.length}{" "}
							collections? This action cannot be undone.
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
							disabled={isDeletingMultipleCollections}
							onClick={handleBulkDelete}
							variant="destructive"
						>
							{isDeletingMultipleCollections && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Delete {checkedRows.length} Collections
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Create Collection Dialog */}
			<Dialog
				onOpenChange={setIsCreatingCollection}
				open={isCreatingCollection}
			>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Create New Collection</DialogTitle>
						<DialogDescription>
							Create a new collection to organize your content.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<label
								className="text-sm font-medium"
								htmlFor="new-name"
							>
								Collection Name
							</label>
							<Input
								id="new-name"
								onChange={(e) =>
									setNewCollection({
										...newCollection,
										name: e.target.value,
									})
								}
								placeholder="Enter collection name"
								value={newCollection.name}
							/>
						</div>
						<div className="grid gap-2">
							<label
								className="text-sm font-medium"
								htmlFor="new-slug"
							>
								Slug
							</label>
							<Input
								id="new-slug"
								onChange={(e) =>
									setNewCollection({
										...newCollection,
										slug: e.target.value,
									})
								}
								placeholder="Enter collection slug"
								value={newCollection.slug}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							onClick={() => setIsCreatingCollection(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button
							disabled={isCreatingCollectionLoading}
							onClick={handleCreate}
							type="submit"
						>
							{isCreatingCollectionLoading && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Create Collection
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
