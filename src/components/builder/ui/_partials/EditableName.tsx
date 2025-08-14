import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { useUpdatePageTitle } from "@/feature/page/queries/usePageActions";
import { PageLight } from "@/feature/page/types/page";
import { cn } from "@/lib/utils";

export default function EditableName({
	children,
	className,
}: {
	children: string;
	className?: string;
}) {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	useEffect(() => {
		setTitle(currentPage.title);
		setPageId(currentPage.id);
	}, [currentPage]);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState("");
	const [pageId, setPageId] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const updateTitle = useUpdatePageTitle();
	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);

	const handleDoubleClick = () => {
		// Don't allow editing if already processing a mutation
		if (updateTitle.isPending) return;

		setIsEditing(true);
		setTimeout(() => inputRef.current?.focus(), 0); // auto-focus
	};

	const saveTitle = () => {
		if (!pageId) {
			setIsEditing(false);
			return;
		}

		// Don't update if title hasn't changed
		if (title === children) {
			setIsEditing(false);
			return;
		}

		updateTitle.mutate(
			{ pageId, title },
			{
				onError: (error) => {
					// Revert to original title on error
					setTitle(children);
					toast.error(
						`Failed to update title: ${error instanceof Error ? error.message : "Unknown error"}`,
					);
					// Stay in editing mode so user can try again
					if (inputRef.current) {
						inputRef.current.focus();
					}
				},
				onSuccess: (data) => {
					// Check if data has the expected properties
					if ("slug" in data && "id" in data && "title" in data) {
						// Data is a PageLight object
						const updatedPage = data as PageLight;
						// Update the displayed title
						setTitle(updatedPage.title);
						setIsEditing(false);

						// Update the current page in the store
						setCurrentPage({
							...currentPage,
							title: updatedPage.title,
						});

						toast.success("Title updated successfully");
					} else {
						// Handle unexpected response
						console.error("Unexpected response format:", data);
						toast.error("Unexpected response format");
						setTitle(children);
					}
				},
			},
		);
	};

	const handleBlur = () => {
		// Only process blur if we're editing and not already processing a mutation
		if (isEditing && !updateTitle.isPending) {
			saveTitle();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault(); // Prevent form submission
			saveTitle();
		} else if (e.key === "Escape") {
			// Cancel editing and revert to original title
			setTitle(children);
			setIsEditing(false);
		}
	};

	return (
		<div className="flex items-center">
			{updateTitle.isPending && (
				<Loader2 className="w-3 h-3 mr-1 animate-spin" />
			)}
			{isEditing ? (
				<input
					className="bg-transparent border border-muted-foreground rounded px-1 w-full text-center text-primary"
					disabled={updateTitle.isPending}
					onBlur={handleBlur}
					onChange={(e) => setTitle(e.target.value)}
					onKeyDown={handleKeyDown}
					ref={inputRef}
					value={title}
				/>
			) : (
				<span
					className={cn(`cursor-pointer`, className)}
					onDoubleClick={handleDoubleClick}
				>
					{title}
				</span>
			)}
		</div>
	);
}
