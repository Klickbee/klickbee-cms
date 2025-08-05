import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useUpdatePageSlug } from "@/feature/page/queries/usePageActions";
import { PageLight } from "@/feature/page/types/page";

export default function EditableSlug({
	initialSlug,
	cleanSlug,
	pageId,
	isEditingSlug = { pageId: null, state: false },
	setIsEditingSlug = (isEditingSlug: {
		state: boolean;
		pageId: number | null;
	}) => {
		/* no-op */
	},
}: {
	initialSlug: string;
	cleanSlug: string;
	pageId?: number;
	isEditingSlug?: { state: boolean; pageId: number | null };
	setIsEditingSlug?: (isEditing: {
		state: boolean;
		pageId: number | null;
	}) => void;
}) {
	const [slug, setSlug] = useState(initialSlug);
	const [cleanedSlug, setCleanedSlug] = useState(cleanSlug);
	const inputRef = useRef<HTMLInputElement>(null);
	const updateSlug = useUpdatePageSlug();

	// Focus the input field when editing starts
	useEffect(() => {
		if (
			isEditingSlug.state &&
			pageId === isEditingSlug.pageId &&
			inputRef.current
		) {
			// Use setTimeout to ensure the input is rendered before focusing
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		}
	}, [isEditingSlug.state, isEditingSlug.pageId, pageId]);

	const saveSlug = () => {
		if (!pageId) {
			setIsEditingSlug({ pageId: null, state: false });
			return;
		}

		// Don't update if slug hasn't changed
		if (cleanedSlug === cleanSlug) {
			setIsEditingSlug({ pageId: null, state: false });
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
						setIsEditingSlug({ pageId: null, state: false });
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
		if (isEditingSlug.state && !updateSlug.isPending) {
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
			setIsEditingSlug({ pageId: null, state: false });
		}
	};

	return (
		<div className="flex items-center">
			{updateSlug.isPending && (
				<Loader2 className="w-3 h-3 mr-1 animate-spin" />
			)}
			{isEditingSlug.state && pageId == isEditingSlug.pageId ? (
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
				>
					{slug}
				</span>
			)}
		</div>
	);
}
