"use server";

import { JsonValue } from "@prisma/client/runtime/library";
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import { prisma } from "@/lib/prisma";

export const getAllPages = async () => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.page.findMany({
		orderBy: {
			id: "asc",
		},
		select: {
			content: true,
			createdAt: true,
			id: true,
			isPublished: true,
			metaDescription: true,
			metaKeywords: true,
			metaTitle: true,
			parentId: true,
			publishedAt: true,
			slug: true,
			title: true,
			updatedAt: true,
			pageHeaderId: true,
			pageFooterId: true,
		},
	});
};

export const getPageById = async (id: number) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.page.findUnique({
		select: {
			content: true,
			createdAt: true,
			id: true,
			isPublished: true,
			metaDescription: true,
			metaKeywords: true,
			metaTitle: true,
			parentId: true,
			publishedAt: true,
			slug: true,
			title: true,
			updatedAt: true,
		},
		where: { id },
	});
};

export const getPublicPageById = async (id: number) => {
	return prisma.page.findUnique({
		select: {
			content: true,
			createdAt: true,
			id: true,
			isPublished: true,
			metaDescription: true,
			metaKeywords: true,
			metaTitle: true,
			parentId: true,
			publishedAt: true,
			slug: true,
			title: true,
			updatedAt: true,
		},
		where: { id },
	});
};

export const createPage = async (data: {
	title: string;
	slug: string;
	content?: JsonValue;
	parentId?: number | null;
}) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.page.create({
		data: {
			content: data.content || {},
			isPublished: false,
			parentId: data.parentId || null,
			slug: data.slug,
			title: data.title,
		},
		select: {
			content: true,
			createdAt: true,
			id: true,
			isPublished: true,
			metaDescription: true,
			metaKeywords: true,
			metaTitle: true,
			parentId: true,
			publishedAt: true,
			slug: true,
			title: true,
			updatedAt: true,
		},
	});
};

export const getLastPageId = async () => {
	return prisma.page
		.findFirst({
			orderBy: {
				id: "desc",
			},
			select: {
				id: true,
			},
		})
		.then((page) => page?.id || 0);
};

export const isHomepage = async (pageId: number) => {
	const homepageSetting = await prisma.settings.findUnique({
		where: { key: "current_homepage_id" },
	});

	return homepageSetting && Number(homepageSetting.value) === pageId;
};
