import { JsonValue } from "@prisma/client/runtime/library";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPage } from "@/feature/page/lib/pages";
import { PageLight } from "@/feature/page/types/page";

export function useCreatePage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			title: string;
			slug: string;
			content?: JsonValue;
			parentId?: number | null;
		}) => {
			try {
				return (await createPage({
					title: data.title,
					slug: data.slug,
					content: data.content,
					parentId: data.parentId,
				})) as PageLight;
			} catch (error) {
				console.error("Error creating page:", error);
				throw error;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["pages"] });
			queryClient.invalidateQueries({ queryKey: ["lastPageId"] });
		},
	});
}
