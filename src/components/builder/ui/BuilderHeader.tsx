"use client";

import { LayoutDashboard, Play, Save, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { useCurrentPageFooterStore } from "@/builder/store/storeCurrentPageFooter";
import { useCurrentPageHeaderStore } from "@/builder/store/storeCurrentPageHeader";
import { BuilderComponent } from "@/builder/types/components/components";
import EditableName from "@/components/builder/ui/_partials/EditableName";
import { Button } from "@/components/ui/button";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useUpdateFooter } from "@/feature/page/queries/useFooterActions";
import { useUpdateHeader } from "@/feature/page/queries/useHeaderActions";
import { useUpdatePageContent } from "@/feature/page/queries/usePageActions";

export default function BuilderHeader() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const { currentPageHeader } = useCurrentPageHeaderStore();
	const { currentPageFooter } = useCurrentPageFooterStore();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const [isSaving, setIsSaving] = useState(false);
	const updatePageContent = useUpdatePageContent();
	const updatePageHeader = useUpdateHeader();
	const updateFooter = useUpdateFooter();

	const handleSave = async () => {
		if (currentPage.id === -1) {
			toast.error("Cannot save: No page is currently selected");
			return;
		}

		setIsSaving(true);
		try {
			// Save header if present (use store data to capture in-session edits)
			if (currentPageHeader && currentPageHeader.id !== -1) {
				const headerContentArray: BuilderComponent[] = Array.isArray(
					currentPageHeader.content,
				)
					? (currentPageHeader.content as unknown as BuilderComponent[])
					: currentPageHeader.content &&
							typeof currentPageHeader.content === "object"
						? [
								currentPageHeader.content as unknown as BuilderComponent,
							]
						: [];
				await updatePageHeader.mutateAsync({
					headerId: currentPageHeader.id,
					content: headerContentArray,
					pageId: currentPage.id,
				});
			}

			// Save footer if present (use store data to capture in-session edits)
			if (currentPageFooter && currentPageFooter.id !== -1) {
				const footerContentArray: BuilderComponent[] = Array.isArray(
					currentPageFooter.content,
				)
					? (currentPageFooter.content as unknown as BuilderComponent[])
					: currentPageFooter.content &&
							typeof currentPageFooter.content === "object"
						? [
								currentPageFooter.content as unknown as BuilderComponent,
							]
						: [];
				await updateFooter.mutateAsync({
					footerId: currentPageFooter.id,
					content: footerContentArray,
					pageId: currentPage.id,
				});
			}

			// Save page body content
			await updatePageContent.mutateAsync({
				content: (Array.isArray(currentPage.content)
					? currentPage.content
					: []) as unknown as BuilderComponent[],
				pageId: currentPage.id,
			});
			toast.success("Page content saved successfully");
		} catch (error) {
			console.error("Error saving page content:", error);
			toast.error("Failed to save page content");
		} finally {
			setIsSaving(false);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "s") {
				e.preventDefault();
				handleSave();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [currentPage, isSaving]);

	return (
		<header className="flex items-center justify-between p-4 border-b h-16">
			<div className="flex items-center gap-6">
				<Button
					asChild
					className="flex items-center gap-2 text-sm font-semibold"
					variant="outline"
				>
					<Link href={`/admin/${adminKey}`}>
						<LayoutDashboard className="w-4 h-4" />
						Dashboard
					</Link>
				</Button>
			</div>

			<div className="flex items-center gap-1 text-sm text-muted-foreground m-auto">
				<EditableName className={`bold text-primary`}>
					{currentPage.title}
				</EditableName>
			</div>

			<div className="flex items-center gap-2">
				<Button
					className="flex items-center gap-1"
					size="sm"
					variant="outline"
				>
					<Play className="w-4 h-4" />
					Preview
				</Button>
				<Button
					className="flex items-center gap-1"
					disabled={isSaving || currentPage.id === -1}
					onClick={handleSave}
					size="sm"
					variant="outline"
				>
					<Save className="w-4 h-4" />
					{isSaving ? "Saving..." : "Save"}
				</Button>
				<Button className="flex items-center gap-1" size="sm">
					<Send className="w-4 h-4" />
					Publish
				</Button>
			</div>
		</header>
	);
}
