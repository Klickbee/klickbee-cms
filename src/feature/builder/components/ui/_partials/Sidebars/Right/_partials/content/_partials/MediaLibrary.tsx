"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import MediaTypeFilterComponent from "@/feature/media/components/MediaFilter";
import MediaGrid from "@/feature/media/components/MediaGrid";
import MediaSearchBar from "@/feature/media/components/MediaSearchBar";
import MediaUploadModal from "@/feature/media/components/MediaUploadModal";
import { useMediaSearch } from "@/feature/media/hooks/useMediaSearch";
import { useMedia } from "@/feature/media/queries/useMedia";
import type { MediaFile } from "@/feature/media/types/media";

export type MediaLibraryTypeFilter = "all" | "IMAGE" | "VIDEO" | "DOCUMENT";

interface MediaLibraryProps {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (media: MediaFile) => void;
	initialTypeFilter?: MediaLibraryTypeFilter;
	title?: string;
}

export default function MediaLibrary({
	isOpen,
	onClose,
	onSelect,
	initialTypeFilter,
	title = "Media Library",
}: MediaLibraryProps) {
	const t = useTranslations("Media");
	const { data: mediaFiles = [], isLoading } = useMedia();
	const {
		searchTerm,
		setSearchTerm,
		typeFilter,
		setTypeFilter,
		filteredMedia,
	} = useMediaSearch(mediaFiles);

	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

	useEffect(() => {
		if (initialTypeFilter) {
			setTypeFilter(initialTypeFilter);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialTypeFilter, isOpen]);

	return (
		<Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
			<DialogContent className="sm:max-w-5xl w-full">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<Card className="gap-0 p-0 border-0 shadow-none">
					<CardContent className="p-0">
						<div className="flex items-center gap-4 mb-4 justify-between px-1">
							<MediaSearchBar
								onSearchChange={setSearchTerm}
								searchTerm={searchTerm}
							/>
							<MediaTypeFilterComponent
								onTypeFilterChange={setTypeFilter}
								typeFilter={typeFilter}
							/>
						</div>

						<div className="min-h-64">
							{isLoading ? (
								<div className="flex justify-center items-center h-40">
									<Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
								</div>
							) : (
								<MediaGrid
									files={filteredMedia}
									onMediaClick={(m) => {
										onSelect(m);
										onClose();
									}}
								/>
							)}
						</div>
					</CardContent>
				</Card>

				<DialogFooter className="pt-2">
					<Button onClick={() => setIsUploadModalOpen(true)}>
						{t("UploadNew")}
					</Button>
				</DialogFooter>

				<MediaUploadModal
					isOpen={isUploadModalOpen}
					onClose={() => setIsUploadModalOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
}
