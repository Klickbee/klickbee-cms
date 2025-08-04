import { JsonValue } from "@prisma/client/runtime/library";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { allPagesOptions } from "@/feature/page/options/allPagesOptions";

export function useCreatePage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			title: string;
			slug: string;
			content?: JsonValue;
			parentId?: number | null;
		}) => {
			const res = await fetch("/api/admin/pages", {
				body: JSON.stringify(data),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});

			if (!res.ok) throw new Error("Failed to create page");
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries(allPagesOptions);
			queryClient.invalidateQueries({ queryKey: ["lastPageId"] });
		},
	});
}
