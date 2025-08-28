"use client";

import { Home, Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
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
import { generateAdminLink } from "@/feature/admin-key/lib/utils";
import { useIsHomepage } from "@/feature/page/queries/useIsHomepage";
import {
	useDeletePage,
	useSetAsHomePage,
} from "@/feature/page/queries/usePageActions";
import { Page } from "@/feature/page/types/page";

export default function PagesTable({ pages }: { pages: Page[] }) {
	const t = useTranslations("Pages");
	const tCommon = useTranslations("Common");
	const [checkedRows, setCheckedRows] = useState<number[]>([]);
	const [pageToDelete, setPageToDelete] = useState<number | null>(null);
	const [isDeletingPage, setIsDeletingPage] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [newHomepageId, setNewHomepageId] = useState<string>("");
	const deletePage = useDeletePage();
	const setAsHomePage = useSetAsHomePage();
	const allIds = pages?.map((page) => page.id) || [];
	const allChecked =
		checkedRows.length === allIds.length && allIds.length > 0;

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
			toast.success(t("DeleteSuccess"));
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

	const openDeleteDialog = (id: number) => {
		setPageToDelete(id);
		setNewHomepageId("");
		setIsDeleteDialogOpen(true);
	};

	return (
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
							<TableHead className="w-12"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pages?.map((page) => {
							const PageRow = () => {
								const { data: isHomepage } = useIsHomepage(
									page.id,
								);

								return (
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
												{isHomepage && (
													<Home className="h-4 w-4" />
												)}
											</a>
										</TableCell>
										<TableCell>{page.slug}</TableCell>
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
													<DropdownMenuItem
														onClick={() =>
															// TODO: edit page
															"Edit"
														}
													>
														<Pencil className="h-4 w-4 mr-2" />
														{tCommon("Edit")}
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
								);
							};

							return <PageRow key={page.id} />;
						})}
					</TableBody>
				</Table>
			</div>
			<PagesPagination checkedRows={checkedRows} pages={pages} />

			{/* Delete Page Confirmation Dialog */}
			<Dialog
				onOpenChange={setIsDeleteDialogOpen}
				open={isDeleteDialogOpen}
			>
				<DialogContent className="sm:max-w-md">
					{(() => {
						const DeleteDialogContent = () => {
							const { data: isPageToDeleteHomepage } =
								useIsHomepage(pageToDelete || 0);
							const otherPages =
								pages?.filter(
									(page) => page.id !== pageToDelete,
								) || [];

							return (
								<>
									<DialogHeader>
										<DialogTitle>
											{t("DeleteTitle")}
										</DialogTitle>
										<DialogDescription>
											{t("DeleteDescription")}
										</DialogDescription>
									</DialogHeader>

									{isPageToDeleteHomepage &&
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
											onClick={() =>
												setIsDeleteDialogOpen(false)
											}
											variant="outline"
										>
											{tCommon("Cancel")}
										</Button>
										<Button
											disabled={
												isDeletingPage ||
												(isPageToDeleteHomepage &&
													!newHomepageId) ||
												false
											}
											onClick={() =>
												pageToDelete &&
												handleDelete(pageToDelete)
											}
											variant="destructive"
										>
											{isDeletingPage && (
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
