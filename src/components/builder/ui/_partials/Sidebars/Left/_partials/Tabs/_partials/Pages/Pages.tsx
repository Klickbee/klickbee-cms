"use client";
import { File, Home, MoreHorizontal, Plus } from "lucide-react";
import EditableSlug from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Pages/_partials/EditableSlug";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { sortPagesWithHomeFirst } from "@/feature/page/lib/pagesClient";
import { useCreatePage } from "@/feature/page/queries/useCreatePage";
import { useLastPageId } from "@/feature/page/queries/useLastPageId";
import {
	useDeletePage,
	useDuplicatePage,
	useSetAsHomePage,
} from "@/feature/page/queries/usePageActions";
import { usePages } from "@/feature/page/queries/usePages";
import { Page, PageLight } from "@/feature/page/types/page";
import {
	useSetSetting,
	useSetting,
} from "@/feature/settings/queries/useSettings";

export default function BuilderTabPagesPages() {
	const { data: pages } = usePages();
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);
	const createPage = useCreatePage();
	const setSetting = useSetSetting();
	const { data: currentHomepageRaw } = useSetting("current_homepage_id");
	const currentHomepage = {
		value: Number(currentHomepageRaw?.value),
	};

	const { data: lastPageId } = useLastPageId();

	// Initialize page action hooks
	const duplicatePage = useDuplicatePage();
	const deletePage = useDeletePage();
	const setAsHomePage = useSetAsHomePage();

	const handleCurrentPageSwitch = (page: PageLight) => {
		setCurrentPage(page);
	};

	const handleAddPage = async () => {
		const newPage = await createPage.mutateAsync({
			content: {},
			slug: `page-${lastPageId}`,
			title: "New Page " + lastPageId,
		});

		if (
			!pages ||
			(Array.isArray(pages) && pages.length === 0) ||
			!currentHomepage
		) {
			await setSetting.mutateAsync({
				key: "current_homepage_id",
				value: String(newPage.id),
			});
		}

		handleCurrentPageSwitch({
			id: newPage.id,
			slug: newPage.slug,
			title: newPage.title,
		});
	};

	const renderPage = (page: Page, isChild = false) => {
		const isHome = Number(currentHomepage?.value) === page.id;
		const isSelected = currentPage?.id === page.id;

		return (
			<div
				className={`group flex items-center justify-between py-1 px-2 rounded-md cursor-pointer ${
					isSelected
						? "bg-primary text-background"
						: "text-foreground"
				}`}
				key={page.id}
			>
				<Button
					className={`flex items-center w-9/10 justify-start truncate text-sm font-normal hover:no-underline ${
						isChild ? "pl-6" : ""
					} ${isSelected ? "text-background" : ""}`}
					onClick={() =>
						handleCurrentPageSwitch({
							id: page.id,
							slug: page.slug,
							title: page.title,
						})
					}
					size="sm"
					variant="link"
				>
					{isHome ? (
						<Home className="w-3 h-3" />
					) : (
						<File className="w-3 h-3" />
					)}

					{/*className={`${isSelected ? "font-semibold" : ""}`}*/}
					<EditableSlug
						cleanSlug={page.slug}
						initialSlug={isHome ? `${page.slug}/` : `/${page.slug}`}
						pageId={page.id}
					/>
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							className="w-5 h-5 p-0 hover:bg-transparent"
							onClick={(e) => e.stopPropagation()}
							size="icon"
							variant="ghost"
						>
							<MoreHorizontal
								className={`w-3 h-3 ${isSelected ? "text-background" : ""}`}
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" sideOffset={4}>
						<DropdownMenuItem
							onClick={() => {
								duplicatePage.mutate(page.id);
							}}
						>
							Duplicate
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								console.warn("to do");
							}}
						>
							Preview
						</DropdownMenuItem>
						<DropdownMenuItem
							disabled={
								Number(currentHomepage?.value) === page.id
							}
							onClick={() => {
								setAsHomePage.mutate(page.id);
							}}
						>
							Set as home page
						</DropdownMenuItem>
						<DropdownMenuItem
							className={"text-destructive"}
							onClick={() => {
								// Prevent deleting the home page
								if (
									Number(currentHomepage?.value) === page.id
								) {
									alert(
										"Cannot delete the home page. Set another page as home first.",
									);
									return;
								}

								if (
									confirm(
										"Are you sure you want to delete this page?",
									)
								) {
									deletePage.mutate(page.id);

									// If the deleted page is the current page, switch to another page
									if (
										currentPage?.id === page.id &&
										Array.isArray(pages) &&
										pages.length > 0
									) {
										const otherPage = pages.find(
											(p) => p.id !== page.id,
										);
										if (otherPage) {
											handleCurrentPageSwitch({
												id: otherPage.id,
												slug: otherPage.slug,
												title: otherPage.title,
											});
										}
									}
								}
							}}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	};

	// Sort pages with home page first
	const sortedPages =
		Array.isArray(pages) && pages
			? sortPagesWithHomeFirst(pages, currentHomepage?.value)
			: [];

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center justify-between px-2 py-2 text-sm font-medium">
				<span>Pages</span>
				<Button onClick={handleAddPage} size="icon" variant="ghost">
					<Plus className="w-4 h-4" />
				</Button>
			</div>

			{sortedPages.length > 0 ? (
				sortedPages
					.filter((p: Page) => p && !p.parentId)
					.map((page: Page) => (
						<div key={page.id}>
							{renderPage(page)}
							{sortedPages
								.filter(
									(child: Page) =>
										child && child.parentId === page.id,
								)
								.map((child: Page) => renderPage(child, true))}
						</div>
					))
			) : (
				<div className="px-2 py-2 text-sm">No pages available</div>
			)}
		</div>
	);
}
