"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma";
import {
	createCollectionItem,
	deleteCollectionItem,
	getCollectionBySlug,
	getCollectionItems,
	updateCollectionItem,
} from "../lib/collections";
import { CollectionItem } from "../types/collection";

import JsonNull = Prisma.NullTypes.JsonNull;

import { InputJsonValue } from "@prisma/client/runtime/library";

/**
 * Fetches collection items by collection ID
 */
export async function getCollectionItemsById(
	collectionId: number,
): Promise<CollectionItem[]> {
	try {
		return await getCollectionItems(collectionId);
	} catch (error) {
		console.error("Error fetching collection items by ID:", error);
		throw new Error("Failed to fetch collection items");
	}
}

/**
 * Fetches collection items by collection slug
 */
export async function getCollectionItemsBySlug(
	slug: string,
): Promise<CollectionItem[]> {
	try {
		const collection = await getCollectionBySlug(slug);
		if (!collection) {
			throw new Error(`Collection with slug "${slug}" not found`);
		}
		return await getCollectionItems(collection.id);
	} catch (error) {
		console.error("Error fetching collection items by slug:", error);
		throw new Error("Failed to fetch collection items");
	}
}

/**
 * Creates a new collection item
 */
export async function createCollectionItemAction(data: {
	title: string;
	slug: string;
	content: JsonNull | InputJsonValue;
	collectionId: number;
	metaTitle?: string;
	metaDescription?: string;
	metaKeywords?: string;
	isPublished?: boolean;
	publishedAt?: Date;
}): Promise<CollectionItem> {
	try {
		const newItem = await createCollectionItem(data);
		revalidatePath(`/admin/[adminKey]/manage/content/${data.slug}`);
		return newItem;
	} catch (error) {
		console.error("Error creating collection item:", error);
		throw new Error("Failed to create collection item");
	}
}

/**
 * Updates an existing collection item
 */
export async function updateCollectionItemAction(
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
): Promise<CollectionItem> {
	try {
		const updatedItem = await updateCollectionItem(id, data);
		revalidatePath(
			`/admin/[adminKey]/manage/content/${data.slug || updatedItem.slug}`,
		);
		return updatedItem;
	} catch (error) {
		console.error("Error updating collection item:", error);
		throw new Error("Failed to update collection item");
	}
}

/**
 * Deletes a collection item
 */
export async function deleteCollectionItemAction(
	id: number,
	slug: string,
): Promise<void> {
	try {
		await deleteCollectionItem(id);
		revalidatePath(`/admin/[adminKey]/manage/content/${slug}`);
	} catch (error) {
		console.error("Error deleting collection item:", error);
		throw new Error("Failed to delete collection item");
	}
}
