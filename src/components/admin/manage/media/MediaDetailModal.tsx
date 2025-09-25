"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { CopyIcon, FileIcon } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteMedia } from "@/feature/media/queries/useDeleteMedia";
import { useUpdateMedia } from "@/feature/media/queries/useUpdateMedia";
import {
	type MediaUpdateSchema,
	mediaUpdateSchema,
} from "@/feature/media/schemas/mediaUpdateSchema";
import type { MediaFile } from "@/feature/media/types/media";
import { userByIdForEditOptions } from "@/feature/user/options/userByIdOptions";
import { UserToUpdate } from "@/feature/user/types/user";
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
	const updateMediaMutation = useUpdateMedia();
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const locale = useLocale();

	// Initialize form
	const form = useForm<MediaUpdateSchema>({
		defaultValues: {
			altText: "",
			caption: "",
			description: "",
		},
		resolver: zodResolver(mediaUpdateSchema),
	});

	// Initialize form with media data
	useEffect(() => {
		if (media) {
			form.reset({
				altText: media.altText || "",
				caption: media.caption || "",
				description: media.description || "",
			});
		}
	}, [media, form]);

	const { data: user } = useQuery(
		userByIdForEditOptions(media?.userId || ""),
	);
	let userData: UserToUpdate | null = null;
	if (user) {
		userData = user as UserToUpdate;
	}

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
		link.download = media.fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleDelete = () => {
		setShowDeleteConfirm(true);
	};

	const confirmDelete = async () => {
		try {
			await deleteMediaMutation.mutateAsync(media.id);
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

	const onSubmit = async (data: MediaUpdateSchema) => {
		try {
			await updateMediaMutation.mutateAsync({
				id: media.id,
				...data,
			});
			toast.success(t("SaveSuccess"));
			onUpdate?.(media); // Trigger refresh if callback provided
		} catch (error) {
			console.error("Error updating media:", error);
			toast.error(t("SaveError"));
		}
	};

	const renderMediaPreview = () => {
		if (media.category === "IMAGE") {
			return (
				<div className="relative w-full h-full overflow-hidden">
					<Image
						alt={media.fileName}
						className="object-contain"
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						src={media.url}
					/>
				</div>
			);
		}

		if (media.category === "VIDEO") {
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
		const extension = media.fileName.split(".").pop()?.toUpperCase() || "";
		return (
			<div className="relative w-full h-80 bg-gray-100 overflow-hidden rounded-lg flex flex-col items-center justify-center">
				<FileIcon className="w-20 h-20 text-gray-400 mb-4" />
				<span className="text-2xl font-medium text-gray-600 mb-2">
					{extension}
				</span>
				<span className="text-sm text-gray-500">{media.fileName}</span>
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
									<span className="text-sm">
										: {userData?.name}
									</span>
								</div>
								<div className="flex">
									<span className="text-sm font-medium w-28">
										{t("UploadedTo")}
									</span>
									{/* TODO: to be replaced when media model will be created */}
									<span className="text-sm">
										: {media.fileName}
									</span>
								</div>
								<div className="flex">
									<span className="text-sm font-medium w-28">
										{t("FileName")}
									</span>
									<span className="text-sm">
										: {media.fileName}
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
								{media.category === "IMAGE" && (
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

						{/* Meta Data Form */}
						<div>
							<h3 className="font-medium mb-2">
								{t("MetaData")}
							</h3>
							<Form {...form}>
								<form
									className="space-y-4"
									onSubmit={form.handleSubmit(onSubmit)}
								>
									<FormField
										control={form.control}
										name="altText"
										render={({ field }) => (
											<FormItem>
												<div className="flex items-center">
													<FormLabel className="text-sm font-medium w-28">
														{t("AltText")}
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="flex-1"
															placeholder={t(
																"EnterAltText",
															)}
															value={
																field.value ||
																""
															}
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="caption"
										render={({ field }) => (
											<FormItem>
												<div className="flex items-center">
													<FormLabel className="text-sm font-medium w-28">
														{t("Caption")}
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="flex-1"
															placeholder={t(
																"EnterCaption",
															)}
															value={
																field.value ||
																""
															}
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<div className="flex items-start">
													<FormLabel className="text-sm font-medium w-28 pt-2">
														{t("Description")}
													</FormLabel>
													<FormControl>
														<Textarea
															{...field}
															className="flex-1"
															placeholder={t(
																"EnterDescription",
															)}
															value={
																field.value ||
																""
															}
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
								</form>
							</Form>
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
						<div className="flex justify-between pt-4 border-t items-center">
							<a
								className="tex-sm font-medium text-blue-800 underline hover:text-blue-600"
								href={media.url}
								rel="noreferrer noopener"
								target="_blank"
							>
								{t("ViewMediaFile")}
							</a>
							<div className="flex flex-wrap gap-2 border-s ps-4">
								<Button
									disabled={updateMediaMutation.isPending}
									onClick={form.handleSubmit(onSubmit)}
									size="sm"
									variant="default"
								>
									{updateMediaMutation.isPending
										? tCommon("Saving")
										: tCommon("Save")}
								</Button>
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
