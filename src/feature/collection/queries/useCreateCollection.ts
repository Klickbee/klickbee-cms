import { useMutation } from "@tanstack/react-query";
import { createCollection } from "@/feature/collection/lib/collections";
import { allCollectionsOptions } from "@/feature/collection/options/allCollectionsOptions";
import { CreateCollectionFormValues } from "@/feature/collection/schemas/createCollectionSchema";
import { getQueryClient } from "@/lib/getQueryClient";

export function useCreateCollection() {
	const queryClient = getQueryClient();

	return useMutation({
		mutationFn: async (
			createCollectionFormValues: CreateCollectionFormValues,
		) => await createCollection(createCollectionFormValues),
		onSuccess: () => {
			queryClient.invalidateQueries(allCollectionsOptions);
		},
	});
}
