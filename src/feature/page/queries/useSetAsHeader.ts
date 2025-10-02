import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCurrentPageHeaderStore } from "@/builder/store/storeCurrentPageHeader";
import { ParentBuilderComponent } from "@/builder/types/components/components";
import {
	getHeaderById,
	setAsHeader,
} from "@/feature/page/actions/headerActions";
import { PageHeaderLight } from "@/feature/page/types/pageHeader";

export function useSetAsHeader() {
	const queryClient = useQueryClient();
	const { setCurrentPageHeader } = useCurrentPageHeaderStore();
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
			if (_data.pageHeaderId)
				setCurrentPageHeader(
					(await getHeaderById(
						_data.pageHeaderId,
					)) as PageHeaderLight,
				);
			toast.success("Header associated successfully");
		},
	});
}
