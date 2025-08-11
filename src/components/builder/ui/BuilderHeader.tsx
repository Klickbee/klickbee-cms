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
import { useUpdatePageContent } from "@/feature/page/queries/usePageActions";

export default function BuilderHeader() {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const [isSaving, setIsSaving] = useState(false);
	const updatePageContent = useUpdatePageContent();

	const handleSave = async () => {
		if (currentPage.id === -1) {
			toast.error("Cannot save: No page is currently selected");
			return;
		}

		setIsSaving(true);
		try {
			await updatePageContent.mutateAsync({
				content: currentPage.content as BuilderComponent[],
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
		<header className="flex items-center justify-between px-4 py-6 border-b">
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
