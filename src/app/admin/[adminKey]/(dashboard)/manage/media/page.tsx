"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import EmptyState from "@/components/admin/manage/EmptyState";
import MediaDetailModal from "@/components/admin/manage/media/MediaDetailModal";
import MediaGrid from "@/components/admin/manage/media/MediaGrid";
import MediaUploadModal from "@/components/admin/manage/media/MediaUploadModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMedia } from "@/feature/media/queries/useMedia";
import type { MediaFile } from "@/feature/media/types/media";

export default function AdminMediaPage() {
	const t = useTranslations("Media");
	const { data: mediaFiles = [], isLoading } = useMedia();
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
					<CardContent className="p-0">
						{isLoading ? (
							<div className="flex justify-center items-center h-40">
								<Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
							</div>
						) : mediaFiles.length > 0 ? (
							<MediaGrid
								files={mediaFiles}
								onMediaClick={handleMediaClick}
							/>
						) : (
							<div className="p-4">
								<EmptyState
									buttonText={t("UploadNew")}
									description={t("EmptyStateDescription")}
									onButtonClick={handleOpenUploadModal}
									title={t("EmptyStateTitle")}
								/>
							</div>
						)}
					</CardContent>
				</Card>
			</section>

			<MediaUploadModal
				isOpen={isUploadModalOpen}
				onClose={handleCloseUploadModal}
				// onUploadSuccess={handleUploadSuccess}
			/>

			<MediaDetailModal
				isOpen={isDetailModalOpen}
				media={selectedMedia}
				onClose={handleCloseDetailModal}
			/>
		</>
	);
}
