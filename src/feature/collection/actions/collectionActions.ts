"use server";

import { InputJsonValue } from "@prisma/client/runtime/library";
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
	Collection,
	CollectionTemplate,
	CollectionWithTemplates,
	mapPrismaCollectionItemToCollectionItem,
	mapPrismaCollectionTemplateToCollectionTemplate,
	mapPrismaCollectionToCollection,
} from "../types/collection";

import JsonNull = Prisma.NullTypes.JsonNull;

/**
 * Gets all collections with their templates
 */
export const getCollections = async (): Promise<CollectionWithTemplates[]> => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		throw new Error("Authentication required");
	}

	try {
		const collections = await prisma.collection.findMany({
			include: {
				items: true,
				templates: true,
			},
		});

		return collections.map((collection) => ({
			...mapPrismaCollectionToCollection(collection),
			items: collection.items.map(
				mapPrismaCollectionItemToCollectionItem,
			),
			templates: collection.templates.map(
				mapPrismaCollectionTemplateToCollectionTemplate,
			),
		}));
	} catch (error) {
		console.error("Error fetching collections:", error);
		throw new Error("Failed to fetch collections");
	}
};

/**
 * Gets a collection by ID with its templates
 */
export const getCollectionById = async (
	id: number,
): Promise<CollectionWithTemplates | null> => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		throw new Error("Authentication required");
	}

	try {
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
	} catch (error) {
		console.error(`Error fetching collection with ID ${id}:`, error);
		throw new Error("Failed to fetch collection");
	}
};

/**
 * Gets a collection by slug with its templates
 */
export const getCollectionBySlug = async (
	slug: string,
): Promise<CollectionWithTemplates | null> => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		throw new Error("Authentication required");
	}

	try {
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
	} catch (error) {
		console.error(`Error fetching collection with slug ${slug}:`, error);
		throw new Error("Failed to fetch collection");
	}
};

/**
 * Creates a new collection
 */
export const createCollection = async (data: {
	name: string;
	slug: string;
}): Promise<Collection> => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		throw new Error("Authentication required");
	}

	try {
		// Validate input
		if (!data.name || !data.slug) {
			throw new Error("Name and slug are required");
		}

		const collection = await prisma.collection.create({
			data,
		});

		return mapPrismaCollectionToCollection(collection);
	} catch (error) {
		console.error("Error creating collection:", error);
		throw new Error("Failed to create collection");
	}
};

/**
 * Updates a collection
 */
export const updateCollection = async (
	id: number,
	data: {
		name?: string;
		slug?: string;
	},
): Promise<Collection> => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		throw new Error("Authentication required");
	}

	try {
		const collection = await prisma.collection.update({
			data,
			where: { id },
		});

		return mapPrismaCollectionToCollection(collection);
	} catch (error) {
		console.error(`Error updating collection with ID ${id}:`, error);
		throw new Error("Failed to update collection");
	}
};

/**
 * Deletes a collection
 */
export const deleteCollection = async (
	id: number,
): Promise<{ success: boolean }> => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		throw new Error("Authentication required");
	}

	try {
		await prisma.collection.delete({
			where: { id },
		});

		return { success: true };
	} catch (error) {
		console.error(`Error deleting collection with ID ${id}:`, error);
		throw new Error("Failed to delete collection");
	}
};

/**
 * Creates a new template
 */
export const createTemplate = async (data: {
	name: string;
	content: JsonNull | InputJsonValue;
	collectionId: number;
}): Promise<CollectionTemplate> => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		throw new Error("Authentication required");
	}

	try {
		// Validate input
		if (!data.name || !data.collectionId) {
			throw new Error("Name and collectionId are required");
		}

		const template = await prisma.collectionTemplate.create({
			data,
		});

		return mapPrismaCollectionTemplateToCollectionTemplate(template);
	} catch (error) {
		console.error("Error creating template:", error);
		throw new Error("Failed to create template");
	}
};

/**
 * Updates a template
 */
export const updateTemplate = async (
	id: number,
	data: {
		name?: string;
		content?: JsonNull | InputJsonValue;
	},
): Promise<CollectionTemplate> => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		throw new Error("Authentication required");
	}

	try {
		const template = await prisma.collectionTemplate.update({
			data,
			where: { id },
		});

		return mapPrismaCollectionTemplateToCollectionTemplate(template);
	} catch (error) {
		console.error(`Error updating template with ID ${id}:`, error);
		throw new Error("Failed to update template");
	}
};

/**
 * Deletes a template
 */
export const deleteTemplate = async (
	id: number,
): Promise<{ success: boolean }> => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		throw new Error("Authentication required");
	}

	try {
		await prisma.collectionTemplate.delete({
			where: { id },
		});

		return { success: true };
	} catch (error) {
		console.error(`Error deleting template with ID ${id}:`, error);
		throw new Error("Failed to delete template");
	}
};
