"use client";

import { FileIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { MediaFile } from "@/feature/media/types/media";

type Props = {
	media: MediaFile;
	onClick?: (media: MediaFile) => void;
};

export default function MediaCard({ media, onClick }: Props) {
	const renderThumbnail = () => {
		if (media.category === "IMAGE") {
			return (
				<div className="relative w-full h-50 bg-gray-100 rounded-t-lg overflow-hidden">
					<Image
						alt={media.fileName}
						className="object-cover"
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						src={media.url}
					/>
				</div>
			);
		}

		if (media.category === "VIDEO") {
			return (
				<div className="relative w-full h-32 bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center">
					{/* For now, show a placeholder. In a real implementation, you might generate video thumbnails */}
					<video
						className="w-full h-full object-cover"
						muted
						preload="metadata"
					>
						<source src={media.url} />
					</video>
					<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
						<div className="bg-white/90 rounded-full p-3">
							<PlayIcon className="w-6 h-6 text-gray-700" />
						</div>
					</div>
				</div>
			);
		}

		return (
			<>
				<div className="relative w-full h-full bg-gray-100 rounded-t-lg flex flex-col items-center justify-center">
					<FileIcon
						className="w-11 h-11 text-gray-400"
						fill="currentColor"
						strokeWidth={0}
					/>
				</div>
				<div className="p-3">
					<p className="text-sm font-semibold text-muted-foreground">
						{media.fileName}
					</p>
				</div>
			</>
		);
	};

	return (
		<Card
			className="overflow-hidden cursor-pointer group p-0 gap-0 shadow-none"
			onClick={() => onClick?.(media)}
		>
			{renderThumbnail()}
		</Card>
	);
}
