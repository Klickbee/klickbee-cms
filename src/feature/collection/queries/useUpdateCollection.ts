import { useMutation } from "@tanstack/react-query";
import { updateCollection } from "@/feature/collection/lib/collections";
import { allCollectionsOptions } from "@/feature/collection/options/allCollectionsOptions";
import { UpdateCollectionFormValues } from "@/feature/collection/schemas/updateCollectionSchema";
import { getQueryClient } from "@/lib/getQueryClient";

interface UpdateCollectionParams {
	collectionSlug: string;
	values: UpdateCollectionFormValues;
}

export function useUpdateCollection() {
	const queryClient = getQueryClient();

	return useMutation({
		mutationFn: async ({
			collectionSlug,
			values,
		}: UpdateCollectionParams) =>
			await updateCollection(collectionSlug, values),
		onSuccess: () => {
			queryClient.invalidateQueries(allCollectionsOptions);
		},
	});
}
