"use client";

import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { useCreatePage } from "@/feature/page/queries/useCreatePage";
import { useLastPageId } from "@/feature/page/queries/useLastPageId";
import { usePages } from "@/feature/page/queries/usePages";
import { PageLight } from "@/feature/page/types/page";
import {
	useSetSetting,
	useSetting,
} from "@/feature/settings/queries/useSettings";

/**
 * Custom hook to handle the creation of new pages
 * and automatically set focus on them
 */
export const useAddPage = () => {
	const { data: pages } = usePages();
	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);
	const createPage = useCreatePage();
	const setSetting = useSetSetting();
	const { data: currentHomepageRaw } = useSetting("current_homepage_id");
	const { data: lastPageId } = useLastPageId();

	const currentHomepage = {
		value: Number(currentHomepageRaw?.value),
	};

	/**
	 * Set focus on a given page
	 */
	const setPageFocus = (page: PageLight) => {
		setCurrentPage(page);
	};

	/**
	 * Create a new page and set focus on it
	 */
	const addPage = async () => {
		const newPage = await createPage.mutateAsync({
			content: {},
			slug: `page-${lastPageId}`,
			title: "New Page " + lastPageId,
		});

		// If it's the first page or if no homepage is defined,
		// set this page as homepage
		if (
			!pages ||
			(Array.isArray(pages) && pages.length === 0) ||
			!currentHomepage?.value
		) {
			await setSetting.mutateAsync({
				key: "current_homepage_id",
				value: String(newPage.id),
			});
		}

		// Set focus on the new page
		setPageFocus({
			content: newPage.content,
			id: newPage.id,
			slug: newPage.slug,
			title: newPage.title,
		});

		return newPage;
	};

	return {
		addPage,
		isCreating: createPage.isPending,
		setPageFocus,
	};
};
