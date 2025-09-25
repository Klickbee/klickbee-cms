"use client";

import type { MediaFile } from "@/feature/media/types/media";
import MediaCard from "./MediaCard";

type Props = {
	files: MediaFile[];
	onMediaClick?: (media: MediaFile) => void;
};

export default function MediaGrid({ files, onMediaClick }: Props) {
	if (files.length === 0) {
		return null;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
			{files.map((file) => (
				<MediaCard
					key={file.fileName}
					media={file}
					onClick={onMediaClick}
				/>
			))}
		</div>
	);
}
