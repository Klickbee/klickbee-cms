"use client";

import { Loader2, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EmptyStateImage from "@/../public/empty_state.png";
import EmptyStateCollectionComponent from "@/components/admin/manage/content/EmptyState";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
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
} from "@/feature/collection/queries/useCollections";

export default function AdminContentPage() {
	const { data: collections, isLoading, error } = useCollections();
	const [newCollection, setNewCollection] = useState({ name: "", slug: "" });
	const [isCreatingCollection, setIsCreatingCollection] = useState(false);
	const [checkedRows, setCheckedRows] = useState<number[]>([]);
	const createCollectionMutation = useCreateCollection();

	const allIds = collections?.map((c) => c.id) || [];
	const allChecked =
		checkedRows.length === allIds.length && allIds.length > 0;

	const handleCreate = () => {
		handleCreateCollection(
			{
				name: newCollection.name,
				slug: newCollection.slug,
			},
			setIsCreatingCollection,
			setNewCollection,
			createCollectionMutation,
		);
	};

	const handleHeaderCheck = (checked: boolean) => {
		setCheckedRows(checked ? allIds : []);
	};
	const handleRowCheck = (id: number, checked: boolean) => {
		setCheckedRows((prev) =>
			checked ? [...prev, id] : prev.filter((rowId) => rowId !== id),
		);
	};

	// console.log(generateAdminLink(`/collections/project`))

	return (
		<div className="flex flex-col p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-semibold">Contents Manager</h1>
					<p className="text-sm text-muted-foreground">
						Manage all the pages of your site.
					</p>
				</div>
				{checkedRows.length > 0 ? (
					<Button variant="destructive">
						<Trash2 className="w-4 h-4 mr-2" />
						Delete Collections
					</Button>
				) : (
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<Plus className="w-4 h-4 mr-2" />
								Create New Collection
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>Create New Collection</DialogTitle>
								<DialogDescription>
									Create a new collection to organize your
									content.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid gap-2">
									<label
										className="text-sm font-medium"
										htmlFor="name"
									>
										Collection Name
									</label>
									<Input
										id="name"
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
										htmlFor="slug"
									>
										Slug
									</label>
									<Input
										id="slug"
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
									disabled={isCreatingCollection}
									onClick={handleCreate}
									type="submit"
								>
									{isCreatingCollection && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Create Collection
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				)}
			</div>

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
				<EmptyStateCollectionComponent />
			) : (
				<div className="border rounded-md">
					{/* Search input */}
					<div className="p-4">
						<Input placeholder="Search" />
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<Checkbox
											checked={allChecked}
											onCheckedChange={handleHeaderCheck}
										/>
									</TableHead>
									<TableHead>Collection Name ⬍</TableHead>
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
										<TableCell>
											<a
												className="flex items-center space-x-2"
												href={generateAdminLink(
													`/manage/content/${collection.slug}`,
												)}
											>
												{collection.name}
											</a>
										</TableCell>
										<TableCell className="text-right">
											0
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>
														<Pencil className="mr-2 h-4 w-4" />
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem className="text-destructive">
														<Trash2 className="mr-2 h-4 w-4" />
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
								<Button variant="outline">Previous</Button>
								<Button variant="outline">Next</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
