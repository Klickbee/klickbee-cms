"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	BuilderComponent,
	ParentBuilderComponent,
} from "@/builder/types/components/components";
import {
	createPageFooter,
	getDefaultPageFooter,
	getPageFooter,
	getPageFooterByPageId,
	setFooterAsDefault,
	setFooterToPage,
	updatePageFooter,
} from "@/feature/page/_footer/actions/pageFooterActions";

export function useSetPageFooter() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			content: ParentBuilderComponent;
			pageId: number;
		}) => {
			const footer = await createPageFooter(data.content, data.pageId);
			// Ensure the page is linked explicitly
			await setFooterToPage(data.pageId, footer.id);
			return footer;
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["pages"] });
			queryClient.invalidateQueries({
				queryKey: ["page", variables.pageId],
			});
			queryClient.invalidateQueries({
				queryKey: ["pageFooterByPage", variables.pageId],
			});
			queryClient.invalidateQueries({ queryKey: ["defaultPageFooter"] });
		},
	});
}

export function useSetFooterAsDefault() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { pageFooterId: number }) => {
			return setFooterAsDefault(data.pageFooterId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["defaultPageFooter"] });
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

export function useUnlinkFooter() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { pageId: number; pageFooterId: number }) => {
			// Fetch existing footer content
			const existing = await getPageFooter(data.pageFooterId);
			if (!existing) throw new Error("Footer not found");
			// Create a new footer with the same content, linked to this page
			const newFooter = await createPageFooter(
				existing.content as ParentBuilderComponent | BuilderComponent[],
				data.pageId,
			);
			await setFooterToPage(data.pageId, newFooter.id);
			return newFooter;
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["page", variables.pageId],
			});
			queryClient.invalidateQueries({
				queryKey: ["pageFooterByPage", variables.pageId],
			});
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

export function usePageFooterByPage(pageId: number | undefined) {
	return useQuery({
		queryKey: ["pageFooterByPage", pageId],
		enabled: !!pageId,
		queryFn: async () => {
			if (!pageId) return null;
			return getPageFooterByPageId(pageId);
		},
	});
}

export function useDefaultPageFooter() {
	return useQuery({
		queryKey: ["defaultPageFooter"],
		queryFn: () => getDefaultPageFooter(),
	});
}

export function useUpdatePageFooter() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			pageFooterId: number;
			content: BuilderComponent[] | ParentBuilderComponent;
		}) => {
			return updatePageFooter(data.pageFooterId, data.content);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["pageFooter", data.id],
			});
			queryClient.invalidateQueries({ queryKey: ["defaultPageFooter"] });
		},
	});
}
