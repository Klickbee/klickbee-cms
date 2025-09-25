import { useMemo, useState } from "react";
import type { MediaFile } from "../types/media";

export type MediaTypeFilter = "all" | "IMAGE" | "VIDEO" | "DOCUMENT";

export function useMediaSearch(mediaFiles: MediaFile[]) {
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState<MediaTypeFilter>("all");

	const filteredMedia = useMemo(() => {
		let filtered = mediaFiles;

		// Filter by type first
		if (typeFilter !== "all") {
			filtered = filtered.filter(
				(media) => media.category === typeFilter,
			);
		}

		// Then filter by search term
		if (searchTerm.trim()) {
			const lowerSearchTerm = searchTerm.toLowerCase();
			filtered = filtered.filter((media) => {
				return (
					media.fileName.toLowerCase().includes(lowerSearchTerm) ||
					media.type.toLowerCase().includes(lowerSearchTerm) ||
					media.category.toLowerCase().includes(lowerSearchTerm)
				);
			});
		}

		return filtered;
	}, [mediaFiles, searchTerm, typeFilter]);

	return {
		filteredMedia,
		searchTerm,
		setSearchTerm,
		setTypeFilter,
		typeFilter,
	};
}
