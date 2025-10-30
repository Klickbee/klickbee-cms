"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	BuilderComponent,
	ParentBuilderComponent,
} from "@/feature/builder/types/components/components";
import {
	createPageHeader,
	getDefaultPageHeader,
	getPageHeader,
	getPageHeaderByPageId,
	setHeaderAsDefault,
	setHeaderToPage,
	updatePageHeader,
} from "@/feature/page/_header/actions/pageHeaderActions";

export function useSetPageHeader() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			content: ParentBuilderComponent;
			pageId: number;
		}) => {
			const header = await createPageHeader(data.content, data.pageId);
			// Ensure the page is linked explicitly
			await setHeaderToPage(data.pageId, header.id);
			return header;
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["pages"] });
			queryClient.invalidateQueries({
				queryKey: ["page", variables.pageId],
			});
			queryClient.invalidateQueries({
				queryKey: ["pageHeaderByPage", variables.pageId],
			});
			queryClient.invalidateQueries({ queryKey: ["defaultPageHeader"] });
		},
	});
}

export function useSetHeaderAsDefault() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { pageHeaderId: number }) => {
			return setHeaderAsDefault(data.pageHeaderId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["defaultPageHeader"] });
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

export function useUnlinkHeader() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { pageId: number; pageHeaderId: number }) => {
			// Fetch existing header content
			const existing = await getPageHeader(data.pageHeaderId);
			if (!existing) throw new Error("Header not found");
			// Create a new header with the same content, linked to this page
			const newHeader = await createPageHeader(
				existing.content as ParentBuilderComponent | BuilderComponent[],
				data.pageId,
			);
			await setHeaderToPage(data.pageId, newHeader.id);
			return newHeader;
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["page", variables.pageId],
			});
			queryClient.invalidateQueries({
				queryKey: ["pageHeaderByPage", variables.pageId],
			});
			queryClient.invalidateQueries({ queryKey: ["pages"] });
		},
	});
}

export function usePageHeaderByPage(pageId: number | undefined) {
	return useQuery({
		queryKey: ["pageHeaderByPage", pageId],
		enabled: !!pageId,
		queryFn: async () => {
			if (!pageId) return null;
			return getPageHeaderByPageId(pageId);
		},
	});
}

export function useDefaultPageHeader() {
	return useQuery({
		queryKey: ["defaultPageHeader"],
		queryFn: () => getDefaultPageHeader(),
	});
}

export function useUpdatePageHeader() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			pageHeaderId: number;
			content: BuilderComponent[] | ParentBuilderComponent;
		}) => {
			return updatePageHeader(data.pageHeaderId, data.content);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["pageHeader", data.id],
			});
			// Invalidate all pageHeaderByPage queries so header re-renders wherever used
			queryClient.invalidateQueries({ queryKey: ["pageHeaderByPage"] });
			queryClient.invalidateQueries({ queryKey: ["defaultPageHeader"] });
		},
	});
}
