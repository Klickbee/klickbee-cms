"use server";

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
			items: true,
			templates: true,
		},
	});
	return collections.map((collection) => ({
		...mapPrismaCollectionToCollection(collection),
		items: collection.items.map(mapPrismaCollectionItemToCollectionItem),
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
	slug: string,
	data: {
		name?: string;
		slug?: string;
	},
): Promise<Collection> => {
	const collection = await prisma.collection.update({
		data,
		where: { slug },
	});

	return mapPrismaCollectionToCollection(collection);
};

export const deleteCollection = async (id: number): Promise<void> => {
	await prisma.collection.delete({
		where: { id },
	});
};

export const deleteCollections = async (ids: string[]) => {
	return prisma.collection.deleteMany({
		where: {
			id: {
				in: ids.map((id) => parseInt(id)),
			},
		},
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

export const getCollectionItemsByCollectionSlug = async (
	collectionSlug: string,
): Promise<{
	collectionItems: CollectionItem[];
	collectionName: string;
}> => {
	const collection = await getCollectionBySlug(collectionSlug);
	if (!collection) {
		throw new Error(`Collection with slug "${collectionSlug}" not found`);
	}
	const collectionsItems = await getCollectionItems(collection.id);

	return {
		collectionItems: collectionsItems,
		collectionName: collection.name,
	};
};

export const createCollectionItem = async (data: {
	title: string;
	slug: string;
	content: JsonNull | InputJsonValue;
	collectionSlug: string;
	author: string;
	metaTitle?: string;
	metaDescription?: string;
	metaKeywords?: string;
	isPublished?: boolean;
	publishedAt?: Date;
}): Promise<CollectionItem> => {
	const collection = await getCollectionBySlug(data.collectionSlug);
	if (!collection) {
		throw new Error(
			`Collection with slug "${data.collectionSlug}" not found`,
		);
	}

	const item = await prisma.collectionItem.create({
		data: {
			...data,
			collectionId: collection.id,
		},
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
