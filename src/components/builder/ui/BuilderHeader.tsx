"use client";

import { LayoutDashboard, Play, Save, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/builder/types/components/components";
import EditableName from "@/components/builder/ui/_partials/EditableName";
import { Button } from "@/components/ui/button";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import {
	usePageFooterByPage,
	useUpdatePageFooter,
} from "@/feature/page/_footer/queries/usePageFooter";
import {
	usePageHeaderByPage,
	useUpdatePageHeader,
} from "@/feature/page/_header/queries/usePageHeader";
import { useUpdatePageContent } from "@/feature/page/queries/usePageActions";

export default function BuilderHeader() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const [isSaving, setIsSaving] = useState(false);
	const updatePageContent = useUpdatePageContent();
	const pageId =
		currentPage?.id && currentPage.id > 0 ? currentPage.id : undefined;
	const { data: pageHeader } = usePageHeaderByPage(pageId);
	const updateHeader = useUpdatePageHeader();
	const { data: pageFooter } = usePageFooterByPage(pageId);
	const updateFooter = useUpdatePageFooter();

	const handleSave = async () => {
		if (currentPage.id === -1) {
			toast.error("Cannot save: No page is currently selected");
			return;
		}

		setIsSaving(true);
		try {
			// Save page body content
			await updatePageContent.mutateAsync({
				content: (Array.isArray(currentPage.content)
					? currentPage.content
					: []) as unknown as BuilderComponent[],
				pageId: currentPage.id,
			});

			// Also save header content if present for this page
			if (pageHeader?.id) {
				await updateHeader.mutateAsync({
					pageHeaderId: pageHeader.id,
					content: (Array.isArray(pageHeader.content)
						? pageHeader.content
						: pageHeader.content
							? [pageHeader.content]
							: []) as unknown as BuilderComponent[],
				});
			}

			// Also save footer content if present for this page
			if (pageFooter?.id) {
				await updateFooter.mutateAsync({
					pageFooterId: pageFooter.id,
					content: (Array.isArray(pageFooter.content)
						? pageFooter.content
						: pageFooter.content
							? [pageFooter.content]
							: []) as unknown as BuilderComponent[],
				});
			}

			toast.success("Page saved successfully");
		} catch (error) {
			console.error("Error saving page:", error);
			toast.error("Failed to save page");
		} finally {
			setIsSaving(false);
		}
	};

	// Bridge Ctrl+S from global shortcut to this handler to ensure toasts and button state are used
	useEffect(() => {
		if (typeof window === "undefined") return;
		// mark that a save handler is available
		window.__builderHasSaveHandler = true;
		const onSave = () => {
			// Avoid duplicate triggers: rely on isSaving flag to ignore if already saving
			if (!isSaving) {
				void handleSave();
			}
		};
		window.addEventListener("builder:save", onSave as EventListener);
		return () => {
			window.removeEventListener("builder:save", onSave as EventListener);
			// unset the flag when unmounting
			delete window.__builderHasSaveHandler;
		};
	}, [isSaving, handleSave]);

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
