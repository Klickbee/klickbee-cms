import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useUpdatePageSlug } from "@/feature/page/queries/usePageActions";
import { PageLight } from "@/feature/page/types/page";

export default function EditableSlug({
	initialSlug,
	cleanSlug,
	pageId,
}: {
	initialSlug: string;
	cleanSlug: string;
	pageId?: number;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [slug, setSlug] = useState(initialSlug);
	const [cleanedSlug, setCleanedSlug] = useState(cleanSlug);
	const inputRef = useRef<HTMLInputElement>(null);
	const updateSlug = useUpdatePageSlug();

	const handleDoubleClick = () => {
		// Don't allow editing if already processing a mutation
		if (updateSlug.isPending) return;

		setIsEditing(true);
		setTimeout(() => inputRef.current?.focus(), 0); // auto-focus
	};

	const saveSlug = () => {
		if (!pageId) {
			setIsEditing(false);
			return;
		}

		// Don't update if slug hasn't changed
		if (cleanedSlug === cleanSlug) {
			setIsEditing(false);
			return;
		}

		updateSlug.mutate(
			{ pageId, slug: cleanedSlug },
			{
				onError: (error) => {
					// Revert to original slug on error
					setCleanedSlug(cleanSlug);
					toast.error(
						`Failed to update slug: ${error instanceof Error ? error.message : "Unknown error"}`,
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
						// Update the displayed slug
						setSlug(
							initialSlug.startsWith("/")
								? `/${updatedPage.slug}`
								: `${updatedPage.slug}/`,
						);
						setCleanedSlug(updatedPage.slug);
						setIsEditing(false);
						toast.success("Slug updated successfully");
					} else {
						// Handle unexpected response
						console.error("Unexpected response format:", data);
						toast.error("Unexpected response format");
						setCleanedSlug(cleanSlug);
					}
				},
			},
		);
	};

	const handleBlur = () => {
		// Only process blur if we're editing and not already processing a mutation
		if (isEditing && !updateSlug.isPending) {
			saveSlug();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault(); // Prevent form submission
			saveSlug();
		} else if (e.key === "Escape") {
			// Cancel editing and revert to original slug
			setCleanedSlug(cleanSlug);
			setIsEditing(false);
		}
	};

	return (
		<div className="flex items-center">
			{updateSlug.isPending && (
				<Loader2 className="w-3 h-3 mr-1 animate-spin" />
			)}
			{isEditing ? (
				<input
					className="bg-transparent text-white border border-white rounded px-1 w-full"
					disabled={updateSlug.isPending}
					onBlur={handleBlur}
					onChange={(e) => setCleanedSlug(e.target.value)}
					onKeyDown={handleKeyDown}
					ref={inputRef}
					value={cleanedSlug}
				/>
			) : (
				<span
					className={`cursor-pointer ${updateSlug.isPending ? "opacity-50" : ""}`}
					onDoubleClick={handleDoubleClick}
				>
					{slug}
				</span>
			)}
		</div>
	);
}
