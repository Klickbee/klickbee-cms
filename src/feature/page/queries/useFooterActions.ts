import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	BuilderComponent,
	ParentBuilderComponent,
} from "@/builder/types/components/components";
import {
	createFooter,
	updateFooterContent,
} from "@/feature/page/actions/footerActions";

export function useCreateFooter() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			content: ParentBuilderComponent;
			pageId?: number;
		}) => {
			return createFooter(data.content, data.pageId);
		},
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({
				queryKey: ["page-footer", variables?.pageId],
			});
		},
	});
}

export function useUpdateFooter() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			footerId: number;
			content: BuilderComponent[];
			pageId: number;
		}) => {
			return updateFooterContent(data.footerId, data.content);
		},
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({
				queryKey: ["page-footer", variables?.pageId],
			});
		},
	});
}
