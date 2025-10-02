import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	BuilderComponent,
	ParentBuilderComponent,
} from "@/builder/types/components/components";
import {
	createHeader,
	updateHeaderContent,
} from "@/feature/page/actions/headerActions";

export function useCreateHeader() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			content: ParentBuilderComponent;
			pageId?: number;
		}) => {
			return createHeader(data.content, data.pageId);
		},
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({
				queryKey: ["page-header", variables?.pageId],
			});
			toast.success("Header created successfully");
		},
	});
}

export function useUpdateHeader() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			headerId: number;
			content: BuilderComponent[];
			pageId: number;
		}) => {
			return updateHeaderContent(data.headerId, data.content);
		},
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({
				queryKey: ["page-header", variables?.pageId],
			});
		},
	});
}
