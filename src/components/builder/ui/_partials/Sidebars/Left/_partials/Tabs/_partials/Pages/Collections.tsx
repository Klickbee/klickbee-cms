"use client";

import {
	ChevronDown,
	ChevronUp,
	Diamond,
	File,
	Loader2,
	MoreHorizontal,
	Plus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleCreateCollection } from "@/feature/collection/handlers/handleCreateCollection";
import {
	useCollections,
	useCreateCollection,
	useDeleteCollection,
} from "@/feature/collection/queries/useCollections";
import {
	useCreateTemplate,
	useDeleteTemplate,
} from "@/feature/collection/queries/useTemplates";
import { slugify } from "@/lib/utils";

export default function BuilderTabPagesCollections() {
	const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
	const [newCollection, setNewCollection] = useState({ name: "", slug: "" });
	const [newTemplate, setNewTemplate] = useState({
		collectionId: 0,
		name: "",
	});
	const [isCreatingCollection, setIsCreatingCollection] = useState(false);
	const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState<{
		open: boolean;
		id?: number;
		collectionId?: number;
	}>({ open: false });
	const [showDeleteCollectionDialog, setShowDeleteCollectionDialog] =
		useState<{ open: boolean; id?: number }>({ open: false });

	const { data: collections, isLoading, error } = useCollections();
	const deleteCollectionMutation = useDeleteCollection();
	const createTemplateMutation = useCreateTemplate();
	const deleteTemplateMutation = useDeleteTemplate();

	const toggleOpen = (id: number) => {
		setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const handleCreate = () => {
		handleCreateCollection(
			{ name: newCollection.name, slug: newCollection.slug },
			setIsCreatingCollection,
			setNewCollection,
		);
	};

	const handleDeleteCollection = async (id: number) => {
		setShowDeleteCollectionDialog({ id, open: true });
	};

	const confirmDeleteCollection = async () => {
		if (!showDeleteCollectionDialog.id) return;
		try {
			await deleteCollectionMutation.mutateAsync(
				showDeleteCollectionDialog.id,
			);
			toast.success("Collection deleted successfully");
		} catch (error) {
			toast.error("Failed to delete collection");
			console.error(error);
		} finally {
			setShowDeleteCollectionDialog({ open: false });
		}
	};

	const handleCreateTemplate = async () => {
		if (!newTemplate.name || !newTemplate.collectionId) {
			toast.error("Name and collection are required");
			return;
		}

		setIsCreatingTemplate(true);
		try {
			await createTemplateMutation.mutateAsync({
				collectionId: newTemplate.collectionId,
				content: {}, // Empty content for now
				name: newTemplate.name,
			});
			setNewTemplate({ collectionId: 0, name: "" });
			toast.success("Template created successfully");
		} catch (error) {
			toast.error("Failed to create template");
			console.error(error);
		} finally {
			setIsCreatingTemplate(false);
		}
	};

	const handleDeleteTemplate = async (id: number, collectionId: number) => {
		setShowDeleteDialog({ collectionId, id, open: true });
	};

	const confirmDeleteTemplate = async () => {
		if (!showDeleteDialog.id || !showDeleteDialog.collectionId) return;
		try {
			await deleteTemplateMutation.mutateAsync({
				collectionId: showDeleteDialog.collectionId,
				id: showDeleteDialog.id,
			});
			toast.success("Template deleted successfully");
		} catch (error) {
			toast.error("Failed to delete template");
			console.error(error);
		} finally {
			setShowDeleteDialog({ open: false });
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-40">
				<Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-40 text-red-500">
				Error loading collections
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center justify-between px-4 pt-6 pb-2 text-sm font-medium text-muted-foreground">
				<span>Content Collection</span>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							className="h-auto p-1"
							size="sm"
							variant="ghost"
						>
							<Plus className="w-4 h-4" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create New Collection</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label className="text-right" htmlFor="name">
									Name
								</Label>
								<Input
									className="col-span-3"
									id="name"
									onChange={(e) =>
										setNewCollection({
											...newCollection,
											name: e.target.value,
										})
									}
									value={newCollection.name}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label className="text-right" htmlFor="slug">
									Slug
								</Label>
								<Input
									className="col-span-3"
									id="slug"
									onChange={(e) =>
										setNewCollection({
											...newCollection,
											slug: e.target.value,
										})
									}
									placeholder="my-collection"
									value={newCollection.slug}
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button
								disabled={isCreatingCollection}
								onClick={handleCreate}
							>
								{isCreatingCollection && (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								)}
								Create
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{collections?.map((collection) => {
				const isOpen = openMap[collection.id] ?? true;
				return (
					<div className="flex flex-col w-full" key={collection.id}>
						<div className="group flex items-center justify-between w-full px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted rounded-sm">
							<ContextMenu>
								<ContextMenuTrigger
									className={"justify-between w-full"}
								>
									<div
										className="flex-row cursor-pointer flex items-center gap-2 justify-between w-full"
										onClick={() =>
											toggleOpen(collection.id)
										}
									>
										<div
											className={
												"flex flex-row gap-2 items-center"
											}
										>
											<Diamond className="w-4 h-4 text-muted-foreground" />
											<span className="truncate">
												{collection.name}
											</span>
										</div>
										{isOpen ? (
											<ChevronUp className="w-4 h-4 ml-auto text-muted-foreground" />
										) : (
											<ChevronDown className="w-4 h-4 ml-auto text-muted-foreground" />
										)}
									</div>
								</ContextMenuTrigger>
								<ContextMenuContent>
									<ContextMenuItem>
										<span>Edit</span>
									</ContextMenuItem>
									<ContextMenuItem
										className={"text-destructive"}
										onClick={() =>
											handleDeleteCollection(
												collection.id,
											)
										}
									>
										Delete Collection
									</ContextMenuItem>
								</ContextMenuContent>
							</ContextMenu>
						</div>

						{isOpen && (
							<div className="flex flex-col gap-1">
								{collection.templates.map((template) => (
									<div
										className="group flex items-center justify-between px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted rounded-sm"
										key={template.id}
									>
										<span className="flex items-center gap-2 pl-6 truncate">
											<File className="w-4 h-4 text-muted-foreground" />
											{template.name}
										</span>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													className="h-8 w-8 p-0"
													variant="ghost"
												>
													<MoreHorizontal className="h-4 w-4 opacity-70 group-hover:opacity-100" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>
													<span>Edit</span>
												</DropdownMenuItem>
												<DropdownMenuItem
													className={
														"text-destructive"
													}
													onClick={() =>
														handleDeleteTemplate(
															template.id,
															collection.id,
														)
													}
												>
													<span>Delete</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								))}

								<Dialog>
									<DialogTrigger asChild>
										<Button
											className="pl-6 py-1.5 text-sm text-muted-foreground hover:text-primary hover:bg-transparent justify-start h-auto"
											onClick={() =>
												setNewTemplate({
													...newTemplate,
													collectionId: collection.id,
												})
											}
											variant="ghost"
										>
											+ Add Template
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>
												Create New Template
											</DialogTitle>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label
													className="text-right"
													htmlFor="template-name"
												>
													Name
												</Label>
												<Input
													className="col-span-3"
													id="template-name"
													onChange={(e) =>
														setNewTemplate({
															...newTemplate,
															name: e.target
																.value,
														})
													}
													value={newTemplate.name}
												/>
											</div>
										</div>
										<DialogFooter>
											<DialogClose asChild>
												<Button variant="outline">
													Cancel
												</Button>
											</DialogClose>
											<Button
												disabled={isCreatingTemplate}
												onClick={handleCreateTemplate}
											>
												{isCreatingTemplate && (
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												)}
												Create
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
						)}
					</div>
				);
			})}

			{/* Dialogs */}
			{showDeleteDialog.open && (
				<Dialog
					onOpenChange={() => setShowDeleteDialog({ open: false })}
					open={showDeleteDialog.open}
				>
					<DialogContent>
						<DialogHeader>Delete Template</DialogHeader>
						<DialogFooter>
							<Button
								onClick={() =>
									setShowDeleteDialog({ open: false })
								}
								variant="outline"
							>
								Cancel
							</Button>
							<Button
								onClick={confirmDeleteTemplate}
								variant="destructive"
							>
								Delete
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}

			{showDeleteCollectionDialog.open && (
				<Dialog
					onOpenChange={() =>
						setShowDeleteCollectionDialog({ open: false })
					}
					open={showDeleteCollectionDialog.open}
				>
					<DialogContent>
						<DialogHeader>Delete Collection</DialogHeader>
						<DialogFooter>
							<Button
								onClick={() =>
									setShowDeleteCollectionDialog({
										open: false,
									})
								}
								variant="outline"
							>
								Cancel
							</Button>
							<Button
								onClick={confirmDeleteCollection}
								variant="destructive"
							>
								Delete
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
