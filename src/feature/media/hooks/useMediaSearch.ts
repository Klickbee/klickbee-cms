import { useMemo, useState } from "react";
import type { MediaFile } from "../types/media";

export function useMediaSearch(mediaFiles: MediaFile[]) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredMedia = useMemo(() => {
		if (!searchTerm.trim()) {
			return mediaFiles;
		}

		const lowerSearchTerm = searchTerm.toLowerCase();

		return mediaFiles.filter((media) => {
			return (
				media.filename.toLowerCase().includes(lowerSearchTerm) ||
				media.type.toLowerCase().includes(lowerSearchTerm) ||
				media.category.toLowerCase().includes(lowerSearchTerm)
			);
		});
	}, [mediaFiles, searchTerm]);

	return {
		filteredMedia,
		searchTerm,
		setSearchTerm,
	};
}
