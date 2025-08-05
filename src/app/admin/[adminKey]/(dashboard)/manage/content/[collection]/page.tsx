"use client";

import { format } from "date-fns";
import { ChevronLast, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import React, { Usable, useEffect, useState } from "react";
import DefaultCardTitle from "@/components/admin/manage/CardTitle";
import DefaultHeader from "@/components/admin/manage/DefaultHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
	getCollectionBySlug,
	getCollections,
} from "@/feature/collection/actions/collectionActions";
import { getCollectionItemsBySlug } from "@/feature/collection/actions/collectionItemsActions";
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

			<Card className={"mx-8 my-6 p-0"}>
				<CardHeader className={"border-b [.border-b]:pb-0 px-3 py-4"}>
					<div className="flex flex-row items-center justify-between">
						<DefaultCardTitle>{collectionName}</DefaultCardTitle>
						<div className="flex items-center gap-2">
							<Button
								asChild
								className={"flex flex-row items-center gap-2"}
							>
								<Link
									className={"text-primary"}
									href={`/admin/${paramsSynced.adminKey}/manage/content/${paramsSynced.collection}/create`}
								>
									<span>+</span> Create {collectionName}
								</Link>
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
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
							<div className="p-8 text-center text-red-500">
								{error}
							</div>
						) : filteredData.length === 0 ? (
							<div className="p-8 text-center">
								No items found in this collection.
							</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Title</TableHead>
										<TableHead>Slug</TableHead>
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
		</>
	);
}
