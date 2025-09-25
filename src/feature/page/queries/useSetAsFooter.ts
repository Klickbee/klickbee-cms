import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ParentBuilderComponent } from "@/builder/types/components/components";
import { setAsFooter } from "@/feature/page/actions/footerActions";

export function useSetAsFooter() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			footerId?: number;
			pageId: number;
			content?: ParentBuilderComponent;
		}) => {
			return setAsFooter(data.pageId, data.footerId, data.content);
		},
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({
				queryKey: ["page-footer", variables.pageId],
			});
			toast.success("Footer associated successfully");
		},
	});
}
