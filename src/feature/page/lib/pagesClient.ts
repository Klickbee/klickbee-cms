import { Page } from "@/feature/page/types/page";

export const sortPagesWithHomeFirst = (pages: Page[], homePageId?: number) => {
	if (!pages || !Array.isArray(pages) || pages.length === 0) {
		return pages;
	}

	// Create a copy of the array to avoid mutating the original
	const sortedPages = [...pages];

	// Sort by id ascending (already done in the database query, but ensuring it here)
	sortedPages.sort((a, b) => a.id - b.id);

	// If homePageId is provided, move the home page to the front
	if (homePageId) {
		const homePageIndex = sortedPages.findIndex(
			(page) => page.id === homePageId,
		);
		if (homePageIndex > 0) {
			// Only move if not already at the front
			const homePage = sortedPages.splice(homePageIndex, 1)[0];
			sortedPages.unshift(homePage);
		}
	}

	return sortedPages;
};
