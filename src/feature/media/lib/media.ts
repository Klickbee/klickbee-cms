import { Media as PrismaMedia } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { type MediaFile, mapPrismaMediaToMediaFile } from "../types/media";

export const createMedia = async (
	data: Omit<PrismaMedia, "id">,
): Promise<MediaFile> => {
	const media = await prisma.media.create({
		data,
	});
	return mapPrismaMediaToMediaFile(media);
};

export const getAllMedias = async (): Promise<MediaFile[]> => {
	const medias = await prisma.media.findMany();

	return medias.map((media) => mapPrismaMediaToMediaFile(media));
};

export const updateMedia = async (
	id: number,
	data: Partial<Pick<PrismaMedia, "altText" | "caption" | "description">>,
): Promise<MediaFile> => {
	const media = await prisma.media.update({
		data: {
			...data,
			updatedAt: new Date(),
		},
		where: { id },
	});
	return mapPrismaMediaToMediaFile(media);
};

export const deleteMedia = async (id: number): Promise<void> => {
	await prisma.media.delete({
		where: { id },
	});
};

export const getMediaById = async (id: number): Promise<MediaFile | null> => {
	const media = await prisma.media.findUnique({
		where: { id },
	});
	return media ? mapPrismaMediaToMediaFile(media) : null;
};
