import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BuilderComponent } from "@/builder/types/components/components";
import {
	deletePage,
	duplicatePage,
	setAsHomePage,
	updatePageContent,
	updatePageParent,
	updatePageSeo,
	updatePageSlug,
	updatePageTitle,
} from "@/feature/page/actions/pageActions";

/**
 * Hook for duplicating a page
 */
export function useDuplicatePage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (pageId: number) => duplicatePage(pageId),
		onSuccess: () => {
			// Invalidate the pages query to refetch the updated list
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

/**
 * Hook for deleting a page
 */
export function useDeletePage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (pageId: number) => deletePage(pageId),
		onSuccess: () => {
			// Invalidate the pages query to refetch the updated list
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

/**
 * Hook for setting a page as the home page
 */
export function useSetAsHomePage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (pageId: number) => setAsHomePage(pageId),
		onSuccess: () => {
			// Invalidate both the pages query and the current_homepage_id setting
			queryClient.invalidateQueries({
				queryKey: ["pages"],
			});
			queryClient.invalidateQueries({
				queryKey: ["isHomepage"],
			});
			queryClient.invalidateQueries({
				queryKey: ["setting", "current_homepage_id"],
			});
			queryClient.invalidateQueries({
				queryKey: ["settings", "current_homepage_id"],
			});
		},
	});
}

/**
 * Hook for updating a page's slug
 */
export function useUpdatePageSlug() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ pageId, slug }: { pageId: number; slug: string }) =>
			updatePageSlug(pageId, slug),
		onSuccess: () => {
			// Invalidate the pages query to refetch the updated list
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

/**
 * Hook for updating a page's title
 */
export function useUpdatePageTitle() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ pageId, title }: { pageId: number; title: string }) =>
			updatePageTitle(pageId, title),
		onSuccess: () => {
			// Invalidate the pages query to refetch the updated list
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

/**
 * Hook for updating a page's parent
 */
export function useUpdatePageParent() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			pageId,
			parentId,
		}: {
			pageId: number;
			parentId: number | null;
		}) => updatePageParent(pageId, parentId),
		onSuccess: () => {
			// Invalidate the pages query to refetch the updated list
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

/**
 * Hook for updating a page's content
 */
export function useUpdatePageContent() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			pageId,
			content,
		}: {
			pageId: number;
			content: BuilderComponent[];
		}) => updatePageContent(pageId, content),
		onSuccess: () => {
			// Invalidate the pages query to refetch the updated list
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

/**
 * Hook for updating a page's SEO
 */
export function useUpdatePageSeo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			pageId,
			data,
		}: {
			pageId: number;
			data: {
				slug: string;
				metaTitle?: string;
				metaDescription?: string;
			};
		}) => updatePageSeo(pageId, data),
		onSuccess: (_data, variables) => {
			// Invalidate the pages query to refetch the updated list
			queryClient.invalidateQueries({ queryKey: ["pages"] });
			queryClient.invalidateQueries({
				queryKey: ["page", variables.pageId],
			});
		},
	});
}
