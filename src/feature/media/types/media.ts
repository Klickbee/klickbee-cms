import { User } from "@/feature/user/types/user";
import { Media as PrismaMedia } from "@/generated/prisma";

export type MediaFile = {
	id: number;
	altText?: string | null;
	caption?: string | null;
	category: "IMAGE" | "VIDEO" | "DOCUMENT";
	description?: string | null;
	fileName: string;
	url: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
};

export type MediaWithUser = MediaFile & {
	uploadedBy: User;
};

export type MediaUploadResponse = {
	url: string;
	fileName: string;
};

export type MediaListResponse = {
	files: MediaFile[];
};

export type MediaDeleteResponse = {
	message: string;
};

export const mapPrismaMediaToMediaFile = (
	prismaMedia: PrismaMedia,
): MediaFile => {
	return {
		altText: prismaMedia.altText,
		caption: prismaMedia.caption,
		category: prismaMedia.category,
		createdAt: prismaMedia.createdAt,
		description: prismaMedia.description,
		fileName: prismaMedia.fileName,
		id: prismaMedia.id,
		updatedAt: prismaMedia.updatedAt,
		url: prismaMedia.url,
		userId: prismaMedia.userId,
	};
};
