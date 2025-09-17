import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export function formatDate(dateString: string, locale?: string) {
	const date = new Date(dateString);
	const resolvedLocale =
		locale ||
		(typeof navigator !== "undefined" && navigator.language) ||
		"en-US";

	return date.toLocaleDateString(resolvedLocale, {
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		month: "long",
		year: "numeric",
	});
}
