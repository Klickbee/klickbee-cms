"use client";

import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DefaultCardTitle from "@/components/admin/manage/CardTitle";
import DefaultHeader from "@/components/admin/manage/DefaultHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCollectionBySlug } from "@/feature/collection/actions/collectionActions";
import { createCollectionItemAction } from "@/feature/collection/actions/collectionItemsActions";

export default function CreateCollectionItemPage({
	params,
}: {
	params: { collection: string; adminKey: string };
}) {
	const router = useRouter();
	const [collectionName, setCollectionName] = useState<string>("");
	const [collectionId, setCollectionId] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Form state
	const [title, setTitle] = useState<string>("");
	const [slug, setSlug] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [metaTitle, setMetaTitle] = useState<string>("");
	const [metaDescription, setMetaDescription] = useState<string>("");
	const [metaKeywords, setMetaKeywords] = useState<string>("");
	const [isPublished, setIsPublished] = useState<boolean>(false);
	const [publishDate, setPublishDate] = useState<string>("");

	useEffect(() => {
		async function fetchCollection() {
			try {
				const collection = await getCollectionBySlug(params.collection);
				if (collection) {
					setCollectionName(collection.name);
					setCollectionId(collection.id);
				} else {
					setError("Collection not found");
				}
			} catch (err) {
				console.error("Error fetching collection:", err);
				setError("Failed to load collection");
			}
		}

		fetchCollection();
	}, [params.collection]);

	// Generate slug from title
	useEffect(() => {
		if (title) {
			setSlug(
				title
					.toLowerCase()
					.replace(/\s+/g, "-")
					.replace(/[^a-z0-9-]/g, ""),
			);
		}
	}, [title]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !slug || !content || !collectionId) {
			setError("Please fill in all required fields");
			return;
		}

		try {
			setIsLoading(true);
			setError(null);

			const itemData = {
				collectionId,
				content: JSON.parse(content),
				isPublished,
				metaDescription: metaDescription || undefined,
				metaKeywords: metaKeywords || undefined,
				metaTitle: metaTitle || undefined,
				publishedAt: publishDate ? new Date(publishDate) : undefined,
				slug,
				title,
			};

			await createCollectionItemAction(itemData);

			// Redirect back to collection items page
			router.push(
				`/admin/${params.adminKey}/manage/content/${params.collection}`,
			);
		} catch (err) {
			console.error("Error creating collection item:", err);
			setError("Failed to create collection item");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<DefaultHeader
				className={"flex flex-row items-center justify-start gap-8"}
				description={`Add a new item to the ${collectionName} collection.`}
				title={`Create New ${collectionName} Item`}
			>
				<Button
					asChild
					className={
						"group bg-background border gap-8 px-3 hover:bg-foreground group:text-primary group-hover:text-secondary"
					}
				>
					<Link
						href={`/admin/${params.adminKey}/manage/content/${params.collection}`}
					>
						<ChevronLeft
							className={
								"text-primary group-hover:text-secondary"
							}
						/>
					</Link>
				</Button>
			</DefaultHeader>

			<Card className={"mx-8 my-6"}>
				<CardHeader>
					<DefaultCardTitle>
						Create New {collectionName} Item
					</DefaultCardTitle>
				</CardHeader>
				<CardContent>
					{error && (
						<div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
							{error}
						</div>
					)}

					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<Label htmlFor="title">Title *</Label>
							<Input
								id="title"
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter title"
								required
								value={title}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="slug">Slug *</Label>
							<Input
								id="slug"
								onChange={(e) => setSlug(e.target.value)}
								placeholder="enter-slug"
								required
								value={slug}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="content">Content (JSON) *</Label>
							<Textarea
								id="content"
								onChange={(e) => setContent(e.target.value)}
								placeholder='{"key": "value"}'
								required
								rows={8}
								value={content}
							/>
						</div>

						<div className="pt-4 border-t">
							<h3 className="text-lg font-medium mb-4">
								SEO Settings
							</h3>

							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="metaTitle">
										Meta Title
									</Label>
									<Input
										id="metaTitle"
										onChange={(e) =>
											setMetaTitle(e.target.value)
										}
										placeholder="Meta title for SEO"
										value={metaTitle}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="metaDescription">
										Meta Description
									</Label>
									<Textarea
										id="metaDescription"
										onChange={(e) =>
											setMetaDescription(e.target.value)
										}
										placeholder="Meta description for SEO"
										rows={3}
										value={metaDescription}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="metaKeywords">
										Meta Keywords
									</Label>
									<Input
										id="metaKeywords"
										onChange={(e) =>
											setMetaKeywords(e.target.value)
										}
										placeholder="keyword1, keyword2, keyword3"
										value={metaKeywords}
									/>
								</div>
							</div>
						</div>

						<div className="pt-4 border-t">
							<h3 className="text-lg font-medium mb-4">
								Publishing Settings
							</h3>

							<div className="space-y-4">
								<div className="flex items-center space-x-2">
									<Checkbox
										checked={isPublished}
										id="isPublished"
										onCheckedChange={(checked) =>
											setIsPublished(checked as boolean)
										}
									/>
									<Label htmlFor="isPublished">
										Publish this item
									</Label>
								</div>

								{isPublished && (
									<div className="space-y-2">
										<Label htmlFor="publishDate">
											Publish Date
										</Label>
										<Input
											id="publishDate"
											onChange={(e) =>
												setPublishDate(e.target.value)
											}
											type="datetime-local"
											value={publishDate}
										/>
										<p className="text-sm text-gray-500">
											Leave empty to publish immediately.
											Set a future date to schedule
											publication.
										</p>
									</div>
								)}
							</div>
						</div>

						<div className="flex justify-end space-x-4 pt-4">
							<Button
								onClick={() =>
									router.push(
										`/admin/${params.adminKey}/manage/content/${params.collection}`,
									)
								}
								type="button"
								variant="outline"
							>
								Cancel
							</Button>
							<Button disabled={isLoading} type="submit">
								{isLoading ? "Creating..." : "Create Item"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</>
	);
}
