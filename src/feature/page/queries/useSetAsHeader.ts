import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ParentBuilderComponent } from "@/builder/types/components/components";
import { setAsHeader } from "@/feature/page/actions/headerActions";

export function useSetAsHeader() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			headerId?: number;
			pageId: number;
			content?: ParentBuilderComponent;
		}) => {
			return setAsHeader(data.pageId, data.headerId, data.content);
		},
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({
				queryKey: ["page-header", variables.pageId],
			});
			toast.success("Header associated successfully");
		},
	});
}
