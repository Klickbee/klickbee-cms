import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSetting } from "@/feature/settings/queries/useSettings";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export function isHome(pageId: number): boolean {
	const { data: currentHomepageRaw } = useSetting("current_homepage_id");
	const currentHomepageId = Number(currentHomepageRaw?.value);

	return pageId === currentHomepageId;
}
