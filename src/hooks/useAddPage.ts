"use client";

import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import {
	getDefaultPageFooter,
	setFooterToPage,
} from "@/feature/page/_footer/actions/pageFooterActions";
import {
	getDefaultPageHeader,
	setHeaderToPage,
} from "@/feature/page/_header/actions/pageHeaderActions";
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

		// Try to assign default header to this new page
		try {
			const defaultHeader = await getDefaultPageHeader();
			if (defaultHeader?.id) {
				await setHeaderToPage(newPage.id, defaultHeader.id);
				// pageHeaderId is persisted server-side; local state reflects through queries/invalidation
			}
		} catch (e) {
			console.warn("Failed to assign default header to new page", e);
		}

		// Try to assign default footer to this new page
		try {
			const defaultFooter = await getDefaultPageFooter();
			if (defaultFooter?.id) {
				await setFooterToPage(newPage.id, defaultFooter.id);
				// pageFooterId is persisted server-side; local state reflects through queries/invalidation
			}
		} catch (e) {
			console.warn("Failed to assign default footer to new page", e);
		}

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
