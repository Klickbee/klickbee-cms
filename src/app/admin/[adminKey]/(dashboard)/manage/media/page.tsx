"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import EmptyState from "@/components/admin/manage/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MediaDetailModal from "@/feature/media/components/MediaDetailModal";
import MediaTypeFilter from "@/feature/media/components/MediaFilter";
import MediaGrid from "@/feature/media/components/MediaGrid";
import MediaSearchBar from "@/feature/media/components/MediaSearchBar";
import MediaUploadModal from "@/feature/media/components/MediaUploadModal";
import { useMediaSearch } from "@/feature/media/hooks/useMediaSearch";
import { useMedia } from "@/feature/media/queries/useMedia";
import type { MediaFile } from "@/feature/media/types/media";

export default function AdminMediaPage() {
	const t = useTranslations("Media");
	const { data: mediaFiles = [], isLoading } = useMedia();
	const {
		searchTerm,
		setSearchTerm,
		typeFilter,
		setTypeFilter,
		filteredMedia,
	} = useMediaSearch(mediaFiles);
	useMediaSearch(mediaFiles);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);

	const handleOpenUploadModal = () => {
		setIsUploadModalOpen(true);
	};

	const handleCloseUploadModal = () => {
		setIsUploadModalOpen(false);
	};

	const handleMediaClick = (media: MediaFile) => {
		setSelectedMedia(media);
		setIsDetailModalOpen(true);
	};

	const handleCloseDetailModal = () => {
		setIsDetailModalOpen(false);
		setSelectedMedia(null);
	};

	return (
		<>
			<DashboardTitle
				subtitle="ManageSubtitle"
				title="ManageTitle"
				translationNamespace="Media"
			/>
			<section className="py-6 px-8">
				<Card className="gap-0 py-0">
					<CardHeader className="py-3 px-4 gap-0 flex flex-row justify-between items-center border-b">
						<CardTitle>{t("ListTitle")}</CardTitle>
						<Button
							className="flex items-center gap-2"
							onClick={handleOpenUploadModal}
						>
							{t("UploadNew")}
						</Button>
					</CardHeader>
					<CardContent className="p-4">
						{isLoading ? (
							<div className="flex justify-center items-center h-40">
								<Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
							</div>
						) : mediaFiles.length > 0 ? (
							<>
								{/* Search Bar and Filters */}
								<div className="flex items-center gap-4 mb-4 justify-between">
									<MediaSearchBar
										onSearchChange={setSearchTerm}
										searchTerm={searchTerm}
									/>
									<MediaTypeFilter
										onTypeFilterChange={setTypeFilter}
										typeFilter={typeFilter}
									/>
								</div>

								{/* Media Grid or No Results */}
								{filteredMedia.length === 0 &&
								(searchTerm.trim() || typeFilter !== "all") ? (
									<div className="text-center py-8 text-muted-foreground">
										{t("NoResultsFound")}
									</div>
								) : (
									<MediaGrid
										files={filteredMedia}
										onMediaClick={handleMediaClick}
									/>
								)}
							</>
						) : (
							<EmptyState
								buttonText={t("UploadNew")}
								description={t("EmptyStateDescription")}
								onButtonClick={handleOpenUploadModal}
								title={t("EmptyStateTitle")}
							/>
						)}
					</CardContent>
				</Card>
			</section>

			<MediaUploadModal
				isOpen={isUploadModalOpen}
				onClose={handleCloseUploadModal}
			/>

			<MediaDetailModal
				isOpen={isDetailModalOpen}
				media={selectedMedia}
				onClose={handleCloseDetailModal}
			/>
		</>
	);
}
