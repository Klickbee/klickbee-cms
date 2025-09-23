"use client";
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useDraggable,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { File, Home, MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import EditableSlug from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Pages/_partials/EditableSlug";
import { Button } from "@/components/ui/button";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortPagesWithHomeFirst } from "@/feature/page/lib/pagesClient";
import {
	useDeletePage,
	useDuplicatePage,
	useSetAsHomePage,
	useUpdatePageParent,
} from "@/feature/page/queries/usePageActions";
import { usePageById } from "@/feature/page/queries/usePageById";
import { usePages } from "@/feature/page/queries/usePages";
import { Page, PageLight } from "@/feature/page/types/page";
import { useSetting } from "@/feature/settings/queries/useSettings";
import { useAddPage } from "@/hooks/useAddPage";

export default function BuilderTabPagesPages() {
	const [isEditingSlug, setIsEditingSlug] = useState<{
		state: boolean;
		pageId: number | null;
	}>({
		pageId: null,
		state: false,
	});
	const { data: pages } = usePages();
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);
	const { data: currentHomepageRaw } = useSetting("current_homepage_id");
	const currentHomepage = {
		value: Number(currentHomepageRaw?.value),
	};
	const { addPage } = useAddPage();

	const { data: homepage } = usePageById(currentHomepage.value);

	useEffect(() => {
		if (currentPage && currentPage?.id === -1 && homepage) {
			setCurrentPage(homepage as PageLight);
		}
	}, [currentPage?.id, homepage, setCurrentPage]);

	// Initialize page action hooks
	const duplicatePage = useDuplicatePage();
	const deletePage = useDeletePage();
	const setAsHomePage = useSetAsHomePage();
	const updatePageParent = useUpdatePageParent();

	// State for drag and drop
	const [activeId, setActiveId] = useState<number | null>(null);
	const [confirmDelete, setConfirmDelete] = useState<{
		open: boolean;
		pageId: number | null;
	}>({ open: false, pageId: null });

	// Prevent hydration mismatch by only enabling DnD on client
	const [isDndEnabled, setIsDndEnabled] = useState(false);

	useEffect(() => {
		setIsDndEnabled(true);
	}, []);

	// Configure sensors for drag detection
	const sensors = useSensors(
		useSensor(PointerSensor, {
			// Require a drag distance of 8px before activating
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	// Handle drag start
	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setActiveId(Number(active.id));
	};

	// Helper function to check if a page is a descendant of another page
	const isDescendantOf = (
		childId: number,
		potentialAncestorId: number,
	): boolean => {
		if (!Array.isArray(pages)) return false;

		// Direct child check
		if (childId === potentialAncestorId) return true;

		// Find all children of the potential ancestor
		const children = pages.filter(
			(page) => page.parentId === potentialAncestorId,
		);

		// Recursively check if any of these children are the child we're looking for
		// or if they have children that are the child we're looking for
		return children.some((child) => isDescendantOf(childId, child.id));
	};

	// Handle drag end
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const draggedPageId = Number(active.id);

			// If dropped on a page, make it a child of that page
			if (over.id.toString().startsWith("page-")) {
				const parentPageId = Number(
					over.id.toString().replace("page-", ""),
				);

				// Don't allow a page to become its own child or parent of its parent
				// Also don't allow a page to become a child of its own descendant (would create circular reference)
				if (
					draggedPageId !== parentPageId &&
					!isDescendantOf(parentPageId, draggedPageId)
				) {
					updatePageParent.mutate({
						pageId: draggedPageId,
						parentId: parentPageId,
					});
				} else {
					// Optionally show an error message
					console.warn("Cannot create circular page references");
				}
			}
			// If dropped on the root container, make it a root page
			else if (over.id === "root-container") {
				updatePageParent.mutate({
					pageId: draggedPageId,
					parentId: null,
				});
			}
		}

		setActiveId(null);
	};

	const handleCurrentPageSwitch = (page: PageLight) => {
		setCurrentPage(page);
	};

	// Draggable page component
	const DraggablePage = ({
		page,
		isChild = false,
	}: {
		page: Page;
		isChild?: boolean;
	}) => {
		const isHome = Number(currentHomepage?.value) === page.id;
		const isSelected = currentPage?.id === page.id;

		// Set up draggable
		const {
			attributes,
			listeners,
			setNodeRef: setDragNodeRef,
			isDragging,
		} = useDraggable({
			disabled: isHome || !isDndEnabled,
			id: page.id,
		});

		// Set up droppable (so other pages can be dropped on this page to become children)
		const { setNodeRef: setDropNodeRef } = useDroppable({
			disabled: !isDndEnabled,
			id: `page-${page.id}`,
		});

		// Combine the refs
		const setNodeRef = (node: HTMLElement | null) => {
			setDragNodeRef(node);
			setDropNodeRef(node);
		};

		return (
			<ContextMenu>
				<ContextMenuTrigger>
					<div
						ref={setNodeRef}
						{...(isEditingSlug.state &&
						isEditingSlug.pageId == page.id
							? {}
							: attributes)}
						{...(isEditingSlug.state &&
						isEditingSlug.pageId == page.id
							? {}
							: listeners)}
						className={`group flex items-center justify-between py-1 px-2 rounded-md cursor-pointer ${
							isSelected
								? "bg-primary text-background"
								: "text-foreground"
						} ${isDragging ? "opacity-50" : "opacity-100"} ${
							activeId !== null && activeId !== page.id
								? "border border-dashed border-gray-300"
								: ""
						}`}
					>
						<Button
							className={`flex items-center w-9/10 justify-start truncate text-sm font-normal hover:no-underline ${
								isChild ? "pl-6" : ""
							} ${isSelected ? "text-background" : ""}`}
							onClick={() =>
								handleCurrentPageSwitch({
									content: page.content,
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

							<EditableSlug
								cleanSlug={page.slug}
								initialSlug={
									isHome ? `${page.slug}/` : `/${page.slug}`
								}
								isEditingSlug={isEditingSlug}
								pageId={page.id}
								setIsEditingSlug={setIsEditingSlug}
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
										Number(currentHomepage?.value) ===
										page.id
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
										if (
											Number(currentHomepage?.value) ===
											page.id
										) {
											toast.error(
												"Cannot delete the home page. Set another page as home first.",
											);
											return;
										}
										setConfirmDelete({
											open: true,
											pageId: page.id,
										});
									}}
								>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						onClick={() => {
							setIsEditingSlug({ pageId: page.id, state: true });
						}}
					>
						Edit Slug
					</ContextMenuItem>
					{page.parentId ? (
						<ContextMenuItem
							onClick={() => {
								updatePageParent.mutate({
									pageId: page.id,
									parentId: null,
								});
							}}
						>
							Make Root Page
						</ContextMenuItem>
					) : null}
				</ContextMenuContent>
			</ContextMenu>
		);
	};

	const renderPageWithChildren = (
		page: Page,
		allPages: Page[],
		depth = 0,
	) => {
		const children = allPages.filter((p) => p.parentId === page.id);
		return (
			<div key={page.id}>
				<DraggablePage isChild={depth > 0} page={page} />
				{children.length > 0 && (
					<div className="ml-4 border-l border-muted pl-2">
						{children.map((child) =>
							renderPageWithChildren(child, allPages, depth + 1),
						)}
					</div>
				)}
			</div>
		);
	};

	// Sort pages with home page first
	const sortedPages =
		Array.isArray(pages) && pages
			? sortPagesWithHomeFirst(pages, currentHomepage?.value)
			: [];

	// Root container component
	const RootContainer = ({ children }: { children: React.ReactNode }) => {
		const { setNodeRef } = useDroppable({
			disabled: !isDndEnabled,
			id: "root-container",
		});

		return (
			<div
				className={`flex flex-col gap-1 ${
					activeId !== null
						? "border-2 border-dashed border-gray-200 rounded-md p-1"
						: ""
				}`}
				ref={setNodeRef}
			>
				{children}
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center justify-between px-2 py-2 text-sm font-medium">
				<span>Pages</span>
				<Button onClick={addPage} size="icon" variant="ghost">
					<Plus className="w-4 h-4" />
				</Button>
			</div>
			{isDndEnabled ? (
				<DndContext
					onDragEnd={handleDragEnd}
					onDragStart={handleDragStart}
					sensors={isEditingSlug.state ? [] : sensors}
				>
					<RootContainer>
						{sortedPages.length > 0 ? (
							sortedPages
								.filter((p: Page) => p && !p.parentId)
								.map((page: Page) =>
									renderPageWithChildren(page, sortedPages),
								)
						) : (
							<div className="px-2 py-2 text-sm">
								No pages available
							</div>
						)}
					</RootContainer>

					{/* Drag overlay to show the dragged item */}
					<DragOverlay>
						{activeId ? (
							<div className="bg-background border border-primary rounded-md p-2 opacity-80 shadow-md">
								{sortedPages.find(
									(page) => page.id === activeId,
								)?.title || "Page"}
							</div>
						) : null}
					</DragOverlay>
				</DndContext>
			) : (
				<div className="flex flex-col gap-1">
					{sortedPages.length > 0 ? (
						sortedPages
							.filter((p: Page) => p && !p.parentId)
							.map((page: Page) =>
								renderPageWithChildren(page, sortedPages),
							)
					) : (
						<div className="px-2 py-2 text-sm">
							No pages available
						</div>
					)}
				</div>
			)}
			<Dialog
				onOpenChange={(open: boolean) =>
					setConfirmDelete({ open, pageId: confirmDelete.pageId })
				}
				open={confirmDelete.open}
			>
				<DialogContent>
					<DialogTitle>Delete Page</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this page?
					</DialogDescription>
					<DialogFooter>
						<Button
							onClick={() =>
								setConfirmDelete({ open: false, pageId: null })
							}
							variant="outline"
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								if (confirmDelete.pageId) {
									deletePage.mutate(confirmDelete.pageId);
									toast.success("Page deleted successfully");
								}
								setConfirmDelete({ open: false, pageId: null });
							}}
							variant="destructive"
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
