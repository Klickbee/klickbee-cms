"use client";

import { Home, Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import SeoBadge from "@/components/admin/_partials/seoBadge";
import PagesPagination from "@/components/admin/manage/Page/pagination";
import { Button } from "@/components/ui/button";
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
import { generateAdminLink, useAdminKey } from "@/feature/admin-key/lib/utils";
import { usePageSearch } from "@/feature/page/hooks/usePageSearch";
import {
	useDeletePage,
	useSetAsHomePage,
} from "@/feature/page/queries/usePageActions";
import { Page } from "@/feature/page/types/page";
import { seoScoreCalculated } from "@/feature/seo/lib/seoScoreCalculated";
import { useSetting } from "@/feature/settings/queries/useSettings";
import PageSearchBar from "./searchBar";

export default function PagesTable({ pages }: { pages: Page[] }) {
	const t = useTranslations("Pages");
	const tCommon = useTranslations("Common");
	const [checkedRows, setCheckedRows] = useState<number[]>([]);
	const [pageToDelete, setPageToDelete] = useState<number | null>(null);
	const [isDeletingPage, setIsDeletingPage] = useState(false);
	const [isDeletingMultiplePages, setIsDeletingMultiplePages] =
		useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [newHomepageId, setNewHomepageId] = useState<string>("");
	const { searchTerm, setSearchTerm, filteredPages } = usePageSearch(pages);
	const deletePage = useDeletePage();
	const setAsHomePage = useSetAsHomePage();
	const { data: homePageId } = useSetting("current_homepage_id");
	const adminKey = useAdminKey();
	const allIds = pages?.map((page) => page.id) || [];
	const allChecked =
		checkedRows.length === allIds.length && allIds.length > 0;
	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);

	const handleHeaderCheck = (checked: boolean) => {
		setCheckedRows(checked ? allIds : []);
	};

	const handleRowCheck = (id: number, checked: boolean) => {
		setCheckedRows((prev) =>
			checked ? [...prev, id] : prev.filter((rowId) => rowId !== id),
		);
	};

	const handleDelete = async (id: number) => {
		setIsDeletingPage(true);
		try {
			if (newHomepageId) {
				await setAsHomePage.mutateAsync(Number(newHomepageId));
			}

			await deletePage.mutateAsync(id);

			setIsDeleteDialogOpen(false);
			setPageToDelete(null);
			setNewHomepageId("");
			toast.success(
				t("DeleteSuccess", {
					count: 1,
				}),
			);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: typeof error === "string"
						? error
						: "UnknownError";
			toast.error(t(errorMessage));
		} finally {
			setIsDeletingPage(false);
		}
	};

	const handleBulkDelete = async () => {
		setIsDeletingMultiplePages(true);
		try {
			if (newHomepageId) {
				await setAsHomePage.mutateAsync(Number(newHomepageId));
			}

			for (const id of checkedRows) {
				await deletePage.mutateAsync(id);
			}

			setIsDeleteDialogOpen(false);
			setCheckedRows([]);
			setNewHomepageId("");
			toast.success(
				t("DeleteSuccess", {
					count: checkedRows?.length || 1,
				}),
			);
		} catch (error) {
			toast.error(
				t("DeleteError", {
					count: checkedRows?.length || 1,
				}),
			);
			console.error(error);
		} finally {
			setIsDeletingMultiplePages(false);
		}
	};

	const openDeleteDialog = (id: number) => {
		setPageToDelete(id);
		setNewHomepageId("");
		setIsDeleteDialogOpen(true);
	};

	return (
		<>
			<div className="flex flex-row justify-between">
				<PageSearchBar
					onSearchChange={setSearchTerm}
					searchTerm={searchTerm}
				/>
				{checkedRows.length > 0 && (
					<Button
						className={"flex flex-row gap-0"}
						onClick={() => {
							setPageToDelete(null);
							setNewHomepageId("");
							setIsDeleteDialogOpen(true);
						}}
						variant="outlineDestructive"
					>
						<Trash2 className="w-4 h-4 mr-2" />
						{tCommon("Delete")} ({checkedRows.length})
					</Button>
				)}
			</div>
			{filteredPages.length === 0 && searchTerm.trim() ? (
				<div className="text-center py-8 text-muted-foreground">
					{t("NoResultsFound")}
				</div>
			) : (
				<>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<Checkbox
											checked={allChecked}
											onCheckedChange={handleHeaderCheck}
										/>
									</TableHead>
									<TableHead>{t("Name")}</TableHead>
									<TableHead>{t("Slug")}</TableHead>
									<TableHead className="text-center">
										{tCommon("SeoScore")}
									</TableHead>
									<TableHead className="w-12"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredPages?.map((page) => (
									<TableRow key={page.id}>
										<TableCell>
											<Checkbox
												checked={checkedRows.includes(
													page.id,
												)}
												onCheckedChange={(
													checked: boolean,
												) =>
													handleRowCheck(
														page.id,
														checked,
													)
												}
											/>
										</TableCell>
										<TableCell className={"w-4/10"}>
											<a
												className="flex items-center space-x-2"
												href={generateAdminLink(
													`/manage/content/${page.slug}`,
												)}
											>
												<span>{page.title}</span>
												{Number(homePageId?.value) ===
													page.id && (
													<Home className="h-4 w-4" />
												)}
											</a>
										</TableCell>
										<TableCell>{page.slug}</TableCell>
										<TableCell className="text-center">
											<SeoBadge
												score={seoScoreCalculated({
													metaDescription:
														page.metaDescription,
													metaKeywords:
														page.metaKeywords,
													metaTitle: page.metaTitle,
													title: page.title,
												})}
											/>
										</TableCell>
										<TableCell className={"w-fit"}>
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
													<DropdownMenuItem asChild>
														<Link
															href={`/admin/${adminKey}/builder`}
															onClick={() => {
																setCurrentPage({
																	content:
																		page.content,
																	id: page.id,
																	slug: page.slug,
																	title: page.title,
																});
															}}
														>
															<Pencil className="h-4 w-4 mr-2" />
															{tCommon("Edit")}
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem
														className="text-destructive"
														onClick={() =>
															openDeleteDialog(
																page.id,
															)
														}
													>
														<Trash2 className="h-4 w-4 mr-2" />
														{tCommon("Delete")}
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<PagesPagination checkedRows={checkedRows} pages={pages} />
				</>
			)}
			{/* Delete Page Confirmation Dialog */}
			<Dialog
				onOpenChange={setIsDeleteDialogOpen}
				open={isDeleteDialogOpen}
			>
				<DialogContent className="sm:max-w-md">
					{(() => {
						const DeleteDialogContent = () => {
							// Determines whether we’re deleting a single page or multiple pages
							const isMultipleSelection =
								!pageToDelete && checkedRows.length > 0;

							// Pages to exclude from the select (single page or multiple pages)
							const pagesToExclude = isMultipleSelection
								? checkedRows
								: pageToDelete
									? [pageToDelete]
									: [];
							const otherPages =
								pages?.filter(
									(page) => !pagesToExclude.includes(page.id),
								) || [];

							// Checks if the homepage is in the pages to delete
							const currentHomepageId = Number(homePageId?.value);
							const isHomepageInSelection = isMultipleSelection
								? checkedRows.includes(currentHomepageId)
								: pageToDelete === currentHomepageId;

							return (
								<>
									<DialogHeader>
										<DialogTitle>
											{t("DeleteTitle", {
												count: checkedRows?.length || 1,
											})}
										</DialogTitle>
										<DialogDescription>
											{t("DeleteDescription", {
												count: checkedRows?.length || 1,
											})}
										</DialogDescription>
									</DialogHeader>

									{isHomepageInSelection &&
										otherPages.length > 0 && (
											<div className="py-4">
												<label className="text-sm font-medium mb-2 block">
													{t("SelectNewHomepage")}
												</label>
												<Select
													onValueChange={
														setNewHomepageId
													}
													value={newHomepageId}
												>
													<SelectTrigger>
														<SelectValue
															placeholder={t(
																"SelectPage",
															)}
														/>
													</SelectTrigger>
													<SelectContent>
														{otherPages.map(
															(page) => (
																<SelectItem
																	key={
																		page.id
																	}
																	value={page.id.toString()}
																>
																	{page.title}
																</SelectItem>
															),
														)}
													</SelectContent>
												</Select>
											</div>
										)}

									<DialogFooter>
										<Button
											onClick={() => {
												setIsDeleteDialogOpen(false);
												setNewHomepageId("");
												setPageToDelete(null);
											}}
											variant="outline"
										>
											{tCommon("Cancel")}
										</Button>
										<Button
											disabled={
												isDeletingPage ||
												isDeletingMultiplePages ||
												(isHomepageInSelection &&
													!newHomepageId)
											}
											onClick={() => {
												if (isMultipleSelection) {
													handleBulkDelete();
												} else if (pageToDelete) {
													handleDelete(pageToDelete);
												}
											}}
											variant="destructive"
										>
											{(isDeletingPage ||
												isDeletingMultiplePages) && (
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											)}
											{tCommon("Delete")}
										</Button>
									</DialogFooter>
								</>
							);
						};

						return <DeleteDialogContent />;
					})()}
				</DialogContent>
			</Dialog>
		</>
	);
}
