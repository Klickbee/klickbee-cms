import { InputJsonValue } from "@prisma/client/runtime/library";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
	Collection,
	CollectionItem,
	CollectionTemplate,
	CollectionWithTemplates,
	mapPrismaCollectionItemToCollectionItem,
	mapPrismaCollectionTemplateToCollectionTemplate,
	mapPrismaCollectionToCollection,
} from "../types/collection";

import JsonNull = Prisma.NullTypes.JsonNull;

// Collection operations
export const getAllCollections = async (): Promise<
	CollectionWithTemplates[]
> => {
	const collections = await prisma.collection.findMany({
		include: {
			templates: true,
		},
	});

	return collections.map((collection) => ({
		...mapPrismaCollectionToCollection(collection),
		templates: collection.templates.map(
			mapPrismaCollectionTemplateToCollectionTemplate,
		),
	}));
};

export const getCollectionById = async (
	id: number,
): Promise<CollectionWithTemplates | null> => {
	const collection = await prisma.collection.findUnique({
		include: {
			templates: true,
		},
		where: { id },
	});

	if (!collection) return null;

	return {
		...mapPrismaCollectionToCollection(collection),
		templates: collection.templates.map(
			mapPrismaCollectionTemplateToCollectionTemplate,
		),
	};
};

export const getCollectionBySlug = async (
	slug: string,
): Promise<CollectionWithTemplates | null> => {
	const collection = await prisma.collection.findUnique({
		include: {
			templates: true,
		},
		where: { slug },
	});

	if (!collection) return null;

	return {
		...mapPrismaCollectionToCollection(collection),
		templates: collection.templates.map(
			mapPrismaCollectionTemplateToCollectionTemplate,
		),
	};
};

export const createCollection = async (data: {
	name: string;
	slug: string;
}): Promise<Collection> => {
	const collection = await prisma.collection.create({
		data,
	});

	return mapPrismaCollectionToCollection(collection);
};

export const updateCollection = async (
	id: number,
	data: {
		name?: string;
		slug?: string;
	},
): Promise<Collection> => {
	const collection = await prisma.collection.update({
		data,
		where: { id },
	});

	return mapPrismaCollectionToCollection(collection);
};

export const deleteCollection = async (id: number): Promise<void> => {
	await prisma.collection.delete({
		where: { id },
	});
};

// Template operations
export const createTemplate = async (data: {
	name: string;
	content: JsonNull | InputJsonValue;
	collectionId: number;
}): Promise<CollectionTemplate> => {
	const template = await prisma.collectionTemplate.create({
		data,
	});

	return mapPrismaCollectionTemplateToCollectionTemplate(template);
};

export const updateTemplate = async (
	id: number,
	data: {
		name?: string;
		content?: JsonNull | InputJsonValue;
	},
): Promise<CollectionTemplate> => {
	const template = await prisma.collectionTemplate.update({
		data,
		where: { id },
	});

	return mapPrismaCollectionTemplateToCollectionTemplate(template);
};

export const deleteTemplate = async (id: number): Promise<void> => {
	await prisma.collectionTemplate.delete({
		where: { id },
	});
};

// Item operations
export const getCollectionItems = async (
	collectionId: number,
): Promise<CollectionItem[]> => {
	const items = await prisma.collectionItem.findMany({
		where: { collectionId },
	});

	return items.map(mapPrismaCollectionItemToCollectionItem);
};

export const createCollectionItem = async (data: {
	title: string;
	slug: string;
	content: JsonNull | InputJsonValue;
	collectionId: number;
	author: string;
	metaTitle?: string;
	metaDescription?: string;
	metaKeywords?: string;
	isPublished?: boolean;
	publishedAt?: Date;
}): Promise<CollectionItem> => {
	const item = await prisma.collectionItem.create({
		data,
	});

	return mapPrismaCollectionItemToCollectionItem(item);
};

export const updateCollectionItem = async (
	id: number,
	data: {
		title?: string;
		slug?: string;
		content?: JsonNull | InputJsonValue;
		metaTitle?: string | null;
		metaDescription?: string | null;
		metaKeywords?: string | null;
		isPublished?: boolean;
		publishedAt?: Date | null;
	},
): Promise<CollectionItem> => {
	const item = await prisma.collectionItem.update({
		data,
		where: { id },
	});

	return mapPrismaCollectionItemToCollectionItem(item);
};

export const deleteCollectionItem = async (id: number): Promise<void> => {
	await prisma.collectionItem.delete({
		where: { id },
	});
};
