"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	generateCssForComponentTree,
	useCssGeneration,
} from "@/feature/builder/hooks/useCssGeneration";
import {
	BuilderComponent,
	ParentBuilderComponent,
} from "@/feature/builder/types/components/components";
import {
	createPageFooter,
	getDefaultPageFooter,
	getPageFooter,
	getPageFooterByPageId,
	setFooterAsDefault,
	setFooterToPage,
	updatePageFooter,
} from "@/feature/page/_footer/actions/pageFooterActions";

type FooterType = {
	id: number;
	content: BuilderComponent[];
	createdAt: Date;
	updatedAt: Date;
	isDefault: boolean;
};

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
		onSuccess: async (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["pages"] });
			queryClient.invalidateQueries({
				queryKey: ["page", variables.pageId],
			});
			queryClient.invalidateQueries({
				queryKey: ["pageFooterByPage", variables.pageId],
			});
			queryClient.invalidateQueries({ queryKey: ["defaultPageFooter"] });

			// Generate CSS for the newly created footer
			try {
				const content = (data as FooterType).content;
				if (content) {
					await generateCssForComponentTree(
						content,
						`footer-${(data as FooterType).id}`,
						`footer-${(data as FooterType).id}.css`,
					);
				}
			} catch (e) {
				console.error("Footer CSS generation failed", e);
			}
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
		onSuccess: async (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["page", variables.pageId],
			});
			queryClient.invalidateQueries({
				queryKey: ["pageFooterByPage", variables.pageId],
			});
			queryClient.invalidateQueries({ queryKey: ["pages"] });

			// Generate CSS for the newly created footer
			try {
				const content = (data as FooterType)?.content;
				if (content) {
					await generateCssForComponentTree(
						content,
						`footer-${(data as FooterType).id}`,
						`footer-${(data as FooterType).id}.css`,
					);
				}
			} catch (e) {
				console.error("Footer CSS generation failed", e);
			}
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
	useCssGeneration();
	return useMutation({
		mutationFn: async (data: {
			pageFooterId: number;
			content: BuilderComponent[] | ParentBuilderComponent;
		}) => {
			return updatePageFooter(data.pageFooterId, data.content);
		},
		onSuccess: async (data) => {
			queryClient.invalidateQueries({
				queryKey: ["pageFooter", data.id],
			});
			queryClient.invalidateQueries({ queryKey: ["defaultPageFooter"] });

			// Generate CSS for the footer content so public renderer has styles
			try {
				const content = data.content as
					| BuilderComponent[]
					| BuilderComponent;
				await generateCssForComponentTree(
					content,
					`footer-${data.id}`,
					`footer-${data.id}.css`,
				);
			} catch (e) {
				console.error("Footer CSS generation failed", e);
			}
		},
	});
}
