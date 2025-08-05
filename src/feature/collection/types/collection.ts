import { JsonValue } from "@prisma/client/runtime/library";
import {
	Collection as PrismaCollection,
	CollectionItem as PrismaCollectionItem,
	CollectionTemplate as PrismaCollectionTemplate,
} from "@/generated/prisma";

export type Collection = {
	id: number;
	name: string;
	slug: string;
	createdAt: Date;
	updatedAt: Date;
	templates?: CollectionTemplate[];
	items?: CollectionItem[];
};

export type CollectionTemplate = {
	id: number;
	name: string;
	content: JsonValue;
	collectionId: number;
	collection?: Collection;
	createdAt: Date;
	updatedAt: Date;
};

export type CollectionItem = {
	id: number;
	collectionId: number;
	collection?: Collection;
	title: string;
	slug: string;
	content: JsonValue;
	createdAt: Date;
	updatedAt: Date;
	metaTitle?: string | null;
	metaDescription?: string | null;
	metaKeywords?: string | null;
	isPublished: boolean;
	publishedAt?: Date | null;
};

export type CollectionWithTemplates = Collection & {
	templates: CollectionTemplate[];
};

export type CollectionWithItems = Collection & {
	items: CollectionItem[];
};

export type CollectionWithTemplatesAndItems = Collection & {
	templates: CollectionTemplate[];
	items: CollectionItem[];
};

export const mapPrismaCollectionToCollection = (
	prismaCollection: PrismaCollection,
): Collection => {
	return {
		createdAt: prismaCollection.createdAt,
		id: prismaCollection.id,
		name: prismaCollection.name,
		slug: prismaCollection.slug,
		updatedAt: prismaCollection.updatedAt,
	};
};

export const mapPrismaCollectionTemplateToCollectionTemplate = (
	prismaTemplate: PrismaCollectionTemplate,
): CollectionTemplate => {
	return {
		collectionId: prismaTemplate.collectionId,
		content: prismaTemplate.content,
		createdAt: prismaTemplate.createdAt,
		id: prismaTemplate.id,
		name: prismaTemplate.name,
		updatedAt: prismaTemplate.updatedAt,
	};
};

export const mapPrismaCollectionItemToCollectionItem = (
	prismaItem: PrismaCollectionItem,
): CollectionItem => {
	return {
		collectionId: prismaItem.collectionId,
		content: prismaItem.content,
		createdAt: prismaItem.createdAt,
		id: prismaItem.id,
		isPublished: prismaItem.isPublished,
		metaDescription: prismaItem.metaDescription,
		metaKeywords: prismaItem.metaKeywords,
		metaTitle: prismaItem.metaTitle,
		publishedAt: prismaItem.publishedAt,
		slug: prismaItem.slug,
		title: prismaItem.title,
		updatedAt: prismaItem.updatedAt,
	};
};
