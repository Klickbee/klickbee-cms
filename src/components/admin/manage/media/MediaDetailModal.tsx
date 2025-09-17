"use client";

import { CopyIcon, FileIcon } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteMedia } from "@/feature/media/queries/useDeleteMedia";
import type { MediaFile } from "@/feature/media/types/media";
import { formatDate } from "@/lib/utils";

type Props = {
	media: MediaFile | null;
	isOpen: boolean;
	onClose: () => void;
	onUpdate?: (media: MediaFile) => void;
};

export default function MediaDetailModal({
	media,
	isOpen,
	onClose,
	onUpdate,
}: Props) {
	const t = useTranslations("Media");
	const tCommon = useTranslations("Common");
	const deleteMediaMutation = useDeleteMedia();
	// const [isEditing, setIsEditing] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [metadata, setMetadata] = useState({
		altText: "",
		caption: "",
		description: "",
		title: "",
	});
	const locale = useLocale();

	if (!media) return null;

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success(tCommon("CopiedToClipboard"));
		} catch (error) {
			console.error("Failed to copy text: ", error);
			toast.error(tCommon("ErrorCopiedToClipboard"));
		}
	};

	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = media.url;
		link.download = media.filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleDelete = () => {
		setShowDeleteConfirm(true);
	};

	const confirmDelete = async () => {
		try {
			await deleteMediaMutation.mutateAsync(media.filename);
			toast.success(t("DeleteSuccess"));
			setShowDeleteConfirm(false);
			onClose();
		} catch (error) {
			console.error("Error deleting media:", error);
			toast.error(t("DeleteError"));
			setShowDeleteConfirm(false);
		}
	};

	const cancelDelete = () => {
		setShowDeleteConfirm(false);
	};

	const renderMediaPreview = () => {
		if (media.category === "image") {
			return (
				<div className="relative w-full h-full overflow-hidden">
					<Image
						alt={media.filename}
						className="object-contain"
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						src={media.url}
					/>
				</div>
			);
		}

		if (media.category === "video") {
			return (
				<div className="relative w-full h-80 bg-gray-100 overflow-hidden rounded-lg">
					<video
						className="w-full h-full object-contain"
						controls
						preload="metadata"
					>
						<source src={media.url} type={media.type} />
						Votre navigateur ne supporte pas la lecture vidéo.
					</video>
				</div>
			);
		}

		// Document preview
		const extension = media.filename.split(".").pop()?.toUpperCase() || "";
		return (
			<div className="relative w-full h-80 bg-gray-100 overflow-hidden rounded-lg flex flex-col items-center justify-center">
				<FileIcon className="w-20 h-20 text-gray-400 mb-4" />
				<span className="text-2xl font-medium text-gray-600 mb-2">
					{extension}
				</span>
				<span className="text-sm text-gray-500">{media.filename}</span>
			</div>
		);
	};

	const getFullUrl = () => {
		if (typeof window !== "undefined") {
			return `${window.location.origin}${media.url}`;
		}
		return media.url;
	};

	return (
		<Dialog onOpenChange={onClose} open={isOpen}>
			<DialogContent className="sm:max-w-[80vw] 2xl:max-w-[60vw] h-[80vh] 2xl:h-[70vh] p-0 overflow-hidden gap-0">
				<DialogHeader className="border-b p-4">
					<DialogTitle className="font-semibold">
						{t("Details")}
					</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-1 xl:grid-cols-2 h-full overflow-auto xl:overflow-hidden">
					{/* Left side - Media Preview */}
					<div className="space-y-4 h-96 xl:h-full">
						{renderMediaPreview()}
					</div>

					{/* Right side - Information */}
					<div className="space-y-4 xl:overflow-auto h-full p-4">
						{/* File Information */}
						<div>
							<h3 className="font-medium mb-2">
								{t("FileInformation")}
							</h3>
							<div className="space-y-3">
								<div className="flex">
									<span className="text-sm font-medium w-28">
										{t("UploadDate")}
									</span>
									<span className="text-sm">
										: {formatDate(media.createdAt, locale)}
									</span>
								</div>
								<div className="flex">
									<span className="text-sm font-medium w-28">
										{t("UploadBy")}
									</span>
									{/* TODO: to be replaced when media model will be created */}
									<span className="text-sm">
										: {media.filename}
									</span>
								</div>
								<div className="flex">
									<span className="text-sm font-medium w-28">
										{t("UploadedTo")}
									</span>
									{/* TODO: to be replaced when media model will be created */}
									<span className="text-sm">
										: {media.filename}
									</span>
								</div>
								<div className="flex">
									<span className="text-sm font-medium w-28">
										{t("FileName")}
									</span>
									<span className="text-sm">
										: {media.filename}
									</span>
								</div>
								<div className="flex">
									<span className="text-sm font-medium w-28">
										{t("FileType")}
									</span>
									<span className="text-sm">
										: {media.category}
									</span>
								</div>
								<div className="flex">
									<span className="text-sm font-medium w-28">
										{t("FileSize")}
									</span>
									<span className="text-sm">
										: {formatFileSize(media.size)}
									</span>
								</div>
								{media.category === "image" && (
									<div className="flex">
										<span className="text-sm font-medium w-28">
											{t("Dimensions")}
										</span>
										<span className="text-sm">
											: {media.width} x {media.height}
										</span>
									</div>
								)}
							</div>
						</div>

						{/* Meta Data */}
						<div>
							<h3 className="font-medium mb-2">
								{t("MetaData")}
							</h3>
							{/* TODO: create a form when media model will be created */}
							<div className="space-y-4">
								<div className="flex">
									<Label
										className="text-sm font-medium w-28"
										htmlFor="altText"
									>
										{t("AltText")}
									</Label>
									<Input
										className="flex-1"
										id="altText"
										onChange={(e) =>
											setMetadata((prev) => ({
												...prev,
												altText: e.target.value,
											}))
										}
										placeholder={t("EnterAltText")}
										value={metadata.altText}
									/>
								</div>
								<div className="flex">
									<Label
										className="text-sm font-medium w-28"
										htmlFor="title"
									>
										{t("Title")}
									</Label>
									<Input
										className="flex-1"
										id="title"
										onChange={(e) =>
											setMetadata((prev) => ({
												...prev,
												title: e.target.value,
											}))
										}
										placeholder={t("EnterTitle")}
										value={metadata.title}
									/>
								</div>
								<div className="flex">
									<Label
										className="text-sm font-medium w-28"
										htmlFor="caption"
									>
										{t("Caption")}
									</Label>
									<Input
										className="flex-1"
										id="caption"
										onChange={(e) =>
											setMetadata((prev) => ({
												...prev,
												caption: e.target.value,
											}))
										}
										placeholder={t("EnterCaption")}
										value={metadata.caption}
									/>
								</div>
								<div className="flex">
									<Label
										className="text-sm font-medium w-28"
										htmlFor="description"
									>
										{t("Description")}
									</Label>
									<Textarea
										className="flex-1"
										id="description"
										onChange={(e) =>
											setMetadata((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
										placeholder={t("EnterDescription")}
										value={metadata.description}
									/>
								</div>
							</div>
						</div>

						{/* File URL */}
						<div>
							<h3 className="font-medium mb-2">{t("FileUrl")}</h3>
							<div className="flex gap-2 ">
								<Input
									className="flex-1"
									id="fileUrl"
									readOnly
									value={getFullUrl()}
								/>
								<Button
									onClick={() =>
										copyToClipboard(getFullUrl())
									}
									size="sm"
									variant="outline"
								>
									<CopyIcon className="w-4 h-4" />
								</Button>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="grid grid-cols-2 pt-4 border-t items-center">
							<a
								className="tex-sm font-medium text-blue-800 underline hover:text-blue-600"
								href={media.url}
								rel="noreferrer noopener"
								target="_blank"
							>
								{t("ViewMediaFile")}
							</a>
							<div className="flex justify-around flex-wrap border-s">
								<Button
									onClick={handleDownload}
									size="sm"
									variant="outline"
								>
									{tCommon("Download")}
								</Button>
								<Button
									onClick={handleDelete}
									size="sm"
									variant="destructive"
								>
									{tCommon("Delete")}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				onOpenChange={setShowDeleteConfirm}
				open={showDeleteConfirm}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{t("DeleteTitle")}</AlertDialogTitle>
						<AlertDialogDescription>
							{t("DeleteDescription")}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={cancelDelete}>
							{tCommon("Cancel")}
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
							onClick={confirmDelete}
						>
							{tCommon("Delete")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Dialog>
	);
}
