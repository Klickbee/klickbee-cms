import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCurrentPageFooterStore } from "@/builder/store/storeCurrentPageFooter";
import { ParentBuilderComponent } from "@/builder/types/components/components";
import {
	getFooterById,
	setAsFooter,
} from "@/feature/page/actions/footerActions";
import { PageHeaderLight } from "@/feature/page/types/pageHeader";

export function useSetAsFooter() {
	const queryClient = useQueryClient();
	const { setCurrentPageFooter } = useCurrentPageFooterStore();

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
			if (_data.pageFooterId)
				setCurrentPageFooter(
					(await getFooterById(
						_data.pageFooterId,
					)) as PageHeaderLight,
				);
			toast.success("Footer associated successfully");
		},
	});
}
