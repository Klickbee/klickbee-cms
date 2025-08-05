"use client";

import {
	ChevronDown,
	ChevronUp,
	Edit,
	Loader2,
	MoreHorizontal,
	Plus,
	Trash,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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

	const { data: collections, isLoading, error } = useCollections();
	const createCollectionMutation = useCreateCollection();
	const deleteCollectionMutation = useDeleteCollection();
	const createTemplateMutation = useCreateTemplate();
	const deleteTemplateMutation = useDeleteTemplate();

	const toggleOpen = (id: number) => {
		setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const handleCreateCollection = async () => {
		if (!newCollection.name || !newCollection.slug) {
			toast.error("Name and slug are required");
			return;
		}

		setIsCreatingCollection(true);
		try {
			await createCollectionMutation.mutateAsync({
				name: newCollection.name,
				slug: slugify(newCollection.slug),
			});
			setNewCollection({ name: "", slug: "" });
			toast.success("Collection created successfully");
		} catch (error) {
			toast.error("Failed to create collection");
			console.error(error);
		} finally {
			setIsCreatingCollection(false);
		}
	};

	const handleDeleteCollection = async (id: number) => {
		if (!confirm("Are you sure you want to delete this collection?"))
			return;

		try {
			await deleteCollectionMutation.mutateAsync(id);
			toast.success("Collection deleted successfully");
		} catch (error) {
			toast.error("Failed to delete collection");
			console.error(error);
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
		if (!confirm("Are you sure you want to delete this template?")) return;

		try {
			// Pass the id directly to the server action, but keep collectionId for cache invalidation
			await deleteTemplateMutation.mutateAsync({ collectionId, id });
			toast.success("Template deleted successfully");
		} catch (error) {
			toast.error("Failed to delete template");
			console.error(error);
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
				<span>Content Collections</span>
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
								onClick={handleCreateCollection}
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
					<div className="flex flex-col" key={collection.id}>
						<div className="group flex items-center justify-between px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted rounded-sm">
							<div
								className="flex-1 cursor-pointer flex items-center"
								onClick={() => toggleOpen(collection.id)}
							>
								<span className="truncate">
									{collection.slug}
								</span>
								{isOpen ? (
									<ChevronUp className="w-4 h-4 ml-1 text-muted-foreground" />
								) : (
									<ChevronDown className="w-4 h-4 ml-1 text-muted-foreground" />
								)}
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										className="h-8 w-8 p-0"
										variant="ghost"
									>
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>
										<Edit className="mr-2 h-4 w-4" />
										<span>Edit</span>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											handleDeleteCollection(
												collection.id,
											)
										}
									>
										<Trash className="mr-2 h-4 w-4" />
										<span>Delete</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						{isOpen && (
							<div className="flex flex-col gap-1">
								{collection.templates.map((template) => (
									<div
										className="group flex items-center justify-between px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted rounded-sm"
										key={template.id}
									>
										<span className="pl-6 before:content-['—'] before:mr-1 truncate">
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
													<Edit className="mr-2 h-4 w-4" />
													<span>Edit</span>
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														handleDeleteTemplate(
															template.id,
															collection.id,
														)
													}
												>
													<Trash className="mr-2 h-4 w-4" />
													<span>Delete</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								))}
								<Dialog>
									<DialogTrigger asChild>
										<Button
											className="pl-6 py-1.5 px-4 text-sm text-blue-600 hover:underline justify-start h-auto"
											onClick={() =>
												setNewTemplate({
													...newTemplate,
													collectionId: collection.id,
												})
											}
											variant="link"
										>
											Create template
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
		</div>
	);
}
