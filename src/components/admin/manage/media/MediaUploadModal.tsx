"use client";

import { CloudUploadIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useUploadMedia } from "@/feature/media/queries/useUploadMedia";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onUploadSuccess?: (url: string) => void;
};

export default function MediaUploadModal({
	isOpen,
	onClose,
	onUploadSuccess,
}: Props) {
	const t = useTranslations("Media");
	const tCommon = useTranslations("Common");
	const uploadMediaMutation = useUploadMedia();
	const [isDragOver, setIsDragOver] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const isUploading = uploadMediaMutation.isPending;
	const fileInputRef = useRef<HTMLInputElement>(null);

	const acceptedFileTypes = [
		"image/png",
		"image/jpeg",
		"image/jpg",
		"image/gif",
		"image/webp",
		"image/svg+xml",
		"video/mp4",
		"video/webm",
		"application/pdf",
	];

	const validateFile = (file: File) => {
		if (!acceptedFileTypes.includes(file.type)) {
			toast.error("Type de fichier non supporté");
			return false;
		}

		// 50MB limit
		const maxSize = 50 * 1024 * 1024;
		if (file.size > maxSize) {
			toast.error("Le fichier est trop volumineux (limite: 50MB)");
			return false;
		}

		return true;
	};

	const handleFileUpload = async (file: File) => {
		if (!validateFile(file)) return;

		try {
			const result = await uploadMediaMutation.mutateAsync(file);
			toast.success(t("UploadSuccess"));
			onUploadSuccess?.(result.url);
			onClose();
			setSelectedFile(null);
		} catch (error) {
			console.error("Upload error:", error);
			toast.error(t("UploadError"));
		}
	};

	const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);

		const files = Array.from(e.dataTransfer.files);
		if (files.length > 0) {
			const file = files[0];
			setSelectedFile(file);
		}
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(true);
	}, []);

	const handleDragLeave = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			setIsDragOver(false);
		},
		[],
	);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	const handleUploadClick = () => {
		if (selectedFile) {
			handleFileUpload(selectedFile);
		}
	};

	const handleCancel = () => {
		setSelectedFile(null);
		setIsDragOver(false);
		onClose();
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	return (
		<Dialog onOpenChange={handleCancel} open={isOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{t("UploadNew")}</DialogTitle>
					<DialogDescription>
						Téléchargez des images, vidéos ou documents pour votre
						médiathèque
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{!selectedFile ? (
						<>
							{/* Drag and Drop Area */}
							<div
								className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
									isDragOver
										? "border-primary bg-primary/10"
										: "border-muted-foreground/25 hover:border-muted-foreground/50"
								}`}
								onClick={() => fileInputRef.current?.click()}
								onDragLeave={handleDragLeave}
								onDragOver={handleDragOver}
								onDrop={handleDrop}
							>
								<CloudUploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
								<p className="text-lg font-medium mb-2">
									{isDragOver
										? "Relâchez pour télécharger"
										: "Glissez-déposez votre fichier ici"}
								</p>
								<p className="text-sm text-muted-foreground mb-4">
									ou cliquez pour sélectionner
								</p>
								<p className="text-xs text-muted-foreground">
									Formats supportés: Images (PNG, JPG, GIF,
									WebP, SVG), Vidéos (MP4, WebM), Documents
									(PDF)
								</p>
								<p className="text-xs text-muted-foreground">
									Taille maximum: 50MB
								</p>
							</div>

							{/* Alternative Button */}
							<div className="text-center">
								<p className="text-sm text-muted-foreground mb-2">
									ou
								</p>
								<Button
									onClick={() =>
										fileInputRef.current?.click()
									}
									variant="outline"
								>
									Choisir un fichier
								</Button>
							</div>
						</>
					) : (
						/* Selected File Preview */
						<div className="border rounded-lg p-4">
							<div className="flex items-center justify-between">
								<div className="flex-1">
									<p className="font-medium truncate">
										{selectedFile.name}
									</p>
									<p className="text-sm text-muted-foreground">
										{formatFileSize(selectedFile.size)} •{" "}
										{selectedFile.type}
									</p>
								</div>
								<Button
									disabled={isUploading}
									onClick={() => setSelectedFile(null)}
									size="sm"
									variant="ghost"
								>
									<XIcon className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}

					{/* Hidden File Input */}
					<input
						accept={acceptedFileTypes.join(",")}
						className="hidden"
						onChange={handleFileSelect}
						ref={fileInputRef}
						type="file"
					/>

					{/* Action Buttons */}
					<div className="flex justify-end gap-2 pt-4">
						<Button
							disabled={isUploading}
							onClick={handleCancel}
							variant="outline"
						>
							{tCommon("Cancel")}
						</Button>
						{selectedFile && (
							<Button
								disabled={isUploading}
								onClick={handleUploadClick}
							>
								{isUploading
									? "Téléchargement..."
									: "Télécharger"}
							</Button>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
