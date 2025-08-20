"use server";

import { BuilderComponent } from "@/builder/types/components/components";
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import { prisma } from "@/lib/prisma";

/**
 * Duplicates a page with a new title and slug
 */
export const duplicatePage = async (pageId: number) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	// Get the original page
	const originalPage = await prisma.page.findUnique({
		where: { id: pageId },
	});

	if (!originalPage) {
		throw new Error("Page not found");
	}

	// Create a duplicate with a new title and slug
	return prisma.page.create({
		data: {
			content: originalPage.content ?? {},
			isPublished: false, // Set as unpublished by default
			metaDescription: originalPage.metaDescription,
			metaKeywords: originalPage.metaKeywords,
			metaTitle: originalPage.metaTitle,
			parentId: originalPage.parentId,
			slug: `${originalPage.slug}-copy`,
			title: `${originalPage.title} (Copy)`,
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
			slug: true,
			title: true,
			updatedAt: true,
		},
	});
};

/**
 * Deletes a page
 */
export const deletePage = async (pageId: number) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	// Check if this is the home page
	const homepageSetting = await prisma.settings.findUnique({
		where: { key: "current_homepage_id" },
	});

	if (homepageSetting && Number(homepageSetting.value) === pageId) {
		throw new Error(
			"Cannot delete the home page. Set another page as home first.",
		);
	}

	// Delete the page
	await prisma.page.delete({
		where: { id: pageId },
	});

	return { success: true };
};

/**
 * Sets a page as the home page
 */
export const setAsHomePage = async (pageId: number) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	// Update the setting
	await prisma.settings.upsert({
		create: { key: "current_homepage_id", value: String(pageId) },
		update: { value: String(pageId) },
		where: { key: "current_homepage_id" },
	});

	return { success: true };
};

/**
 * Updates a page's slug
 */
export const updatePageSlug = async (pageId: number, slug: string) => {
	try {
		const authError = await isAuthenticatedGuard();
		if (authError) {
			return authError;
		}

		// Validate slug
		if (!slug || slug.trim() === "") {
			throw new Error("Slug cannot be empty");
		}

		// Sanitize slug - remove special characters, replace spaces with hyphens
		const sanitizedSlug = slug
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "") // Remove special characters
			.replace(/\s+/g, "-") // Replace spaces with hyphens
			.replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen

		if (sanitizedSlug === "") {
			throw new Error("Slug contains only invalid characters");
		}

		// Check if the page exists
		const page = await prisma.page.findUnique({
			where: { id: pageId },
		});

		if (!page) {
			throw new Error(`Page with ID ${pageId} not found`);
		}

		// Check if slug is already in use by another page
		const existingPage = await prisma.page.findFirst({
			where: {
				id: { not: pageId }, // Exclude the current page
				slug: sanitizedSlug,
			},
		});

		if (existingPage) {
			throw new Error(
				`Slug '${sanitizedSlug}' is already in use by another page`,
			);
		}

		// Update the page's slug
		return prisma.page.update({
			data: { slug: sanitizedSlug },
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
			where: { id: pageId },
		});
	} catch (error) {
		console.error("Error updating page slug:", error);
		throw error; // Re-throw to be caught by the client
	}
};

/**
 * Updates a page's title
 */
export const updatePageTitle = async (pageId: number, title: string) => {
	try {
		const authError = await isAuthenticatedGuard();
		if (authError) {
			return authError;
		}

		// Validate title
		if (!title || title.trim() === "") {
			throw new Error("Title cannot be empty");
		}

		// Trim the title to remove leading/trailing whitespace
		const trimmedTitle = title.trim();

		// Check if the page exists
		const page = await prisma.page.findUnique({
			where: { id: pageId },
		});

		if (!page) {
			throw new Error(`Page with ID ${pageId} not found`);
		}

		// Update the page's title
		return prisma.page.update({
			data: { title: trimmedTitle },
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
			where: { id: pageId },
		});
	} catch (error) {
		console.error("Error updating page title:", error);
		throw error; // Re-throw to be caught by the client
	}
};

/**
 * Updates a page's parent relationship
 */
export const updatePageParent = async (
	pageId: number,
	parentId: number | null,
) => {
	try {
		const authError = await isAuthenticatedGuard();
		if (authError) {
			return authError;
		}

		// Check if the page exists
		const page = await prisma.page.findUnique({
			where: { id: pageId },
		});

		if (!page) {
			throw new Error(`Page with ID ${pageId} not found`);
		}

		// If parentId is provided, check if the parent page exists
		if (parentId !== null) {
			// Prevent setting a page as its own parent
			if (pageId === parentId) {
				throw new Error("A page cannot be its own parent");
			}

			const parentPage = await prisma.page.findUnique({
				where: { id: parentId },
			});

			if (!parentPage) {
				throw new Error(`Parent page with ID ${parentId} not found`);
			}

			// Prevent circular references (parent can't be a child of this page)
			// This is a simple check for direct circular references
			if (parentPage.parentId === pageId) {
				throw new Error("Cannot create circular page references");
			}

			// Check if the parent page is the homepage
			const homepageSetting = await prisma.settings.findUnique({
				where: { key: "current_homepage_id" },
			});

			if (homepageSetting && Number(homepageSetting.value) === parentId) {
				throw new Error("Homepage cannot have children");
			}

			// Check if the parent page already has a parent (to limit nesting depth to 1)
			if (parentPage.parentId !== null) {
				throw new Error("Maximum nesting depth is 1 level");
			}
		}

		// Update the page's parent
		return prisma.page.update({
			data: { parentId },
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
			where: { id: pageId },
		});
	} catch (error) {
		console.error("Error updating page parent:", error);
		throw error; // Re-throw to be caught by the client
	}
};

/**
 * Updates a page's content
 */
export const updatePageContent = async (
	pageId: number,
	content: BuilderComponent[],
) => {
	try {
		const authError = await isAuthenticatedGuard();
		if (authError) {
			return authError;
		}

		// Check if the page exists
		const page = await prisma.page.findUnique({
			where: { id: pageId },
		});

		if (!page) {
			throw new Error(`Page with ID ${pageId} not found`);
		}
		// Update the page's content
		return prisma.page.update({
			data: { content },
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
			where: { id: pageId },
		});
	} catch (error) {
		console.error("Error updating page content:", error);
		throw error; // Re-throw to be caught by the client
	}
};
