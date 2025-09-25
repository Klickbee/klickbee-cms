import { useMutation } from "@tanstack/react-query";
import { createCollectionItem } from "@/feature/collection/lib/collections";
import { allCollectionItemsBySlugOptions } from "@/feature/collectionItem/options/allCollectionItemsBySlugOptions";
import { CreateCollectionItemFormValues } from "@/feature/collectionItem/schemas/createCollectionItemSchema";
import { getQueryClient } from "@/lib/getQueryClient";

export function useCreateCollectionItem(collectionSlug: string) {
	const queryClient = getQueryClient();

	return useMutation({
		mutationFn: async (
			createCollectionItemFormValues: CreateCollectionItemFormValues,
		) => await createCollectionItem(createCollectionItemFormValues),
		onSuccess: () => {
			queryClient.invalidateQueries(
				allCollectionItemsBySlugOptions(collectionSlug),
			);
		},
	});
}
