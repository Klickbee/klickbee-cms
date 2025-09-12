import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// Dynamic: regenerate on every request so edits are reflected immediately
export const revalidate = 0;

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Published pages only
	const pages = await prisma.page.findMany({
		select: {
			parent: { select: { slug: true } },
			slug: true,
			updatedAt: true,
		},
		where: {
			isPublished: true,
			OR: [{ parentId: null }, { parent: { isPublished: true } }],
		},
	});

	// Published collection items only
	const items = await prisma.collectionItem.findMany({
		select: {
			collection: { select: { slug: true } },
			slug: true,
			updatedAt: true,
		},
		where: { isPublished: true },
	});

	const pageEntries: MetadataRoute.Sitemap = pages.map((p) => ({
		changeFrequency: "weekly",
		lastModified: p.updatedAt,
		priority: 0.8,
		url: `${BASE_URL}/${p.parent?.slug ? `${p.parent.slug}/` : ""}${p.slug}`,
	}));

	const itemEntries: MetadataRoute.Sitemap = items
		.filter((i) => Boolean(i.collection?.slug))
		.map((i) => ({
			changeFrequency: "daily",
			lastModified: i.updatedAt,
			priority: 0.7,
			url: `${BASE_URL}/${i.collection!.slug}/${i.slug}`,
		}));

	const staticEntries: MetadataRoute.Sitemap = [
		{
			changeFrequency: "weekly",
			lastModified: new Date(),
			priority: 1,
			url: `${BASE_URL}/`,
		},
	];

	return [...staticEntries, ...pageEntries, ...itemEntries];
}
