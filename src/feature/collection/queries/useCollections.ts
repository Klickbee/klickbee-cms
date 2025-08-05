import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createCollection,
	deleteCollection,
	getCollectionById,
	getCollectionBySlug,
	getCollections,
	updateCollection,
} from "../actions/collectionActions";
import { Collection, CollectionWithTemplates } from "../types/collection";

// Query hook to fetch all collections
export function useCollections() {
	return useQuery<CollectionWithTemplates[]>({
		queryFn: async () => {
			try {
				return await getCollections();
			} catch (error) {
				throw new Error(
					"Failed to fetch collections : " +
						(error instanceof Error
							? error.message
							: "Unknown error"),
				);
			}
		},
		queryKey: ["collections"],
	});
}

// Query hook to fetch a single collection by ID
export function useCollection(id: number | null) {
	return useQuery<CollectionWithTemplates>({
		enabled: !!id, // Only run the query if id is provided
		queryFn: async () => {
			if (!id) throw new Error("Collection ID is required");

			const collection = await getCollectionById(id);
			if (!collection) throw new Error("Collection not found");

			return collection;
		},
		queryKey: ["collection", id],
	});
}

// Query hook to fetch a single collection by slug
export function useCollectionBySlug(slug: string | null) {
	return useQuery<CollectionWithTemplates>({
		enabled: !!slug, // Only run the query if slug is provided
		queryFn: async () => {
			if (!slug) throw new Error("Collection slug is required");

			const collection = await getCollectionBySlug(slug);
			if (!collection) throw new Error("Collection not found");

			return collection;
		},
		queryKey: ["collection", "slug", slug],
	});
}

// Mutation hook to create a new collection
export function useCreateCollection() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { name: string; slug: string }) => {
			try {
				return await createCollection(data);
			} catch (error) {
				if (error instanceof Error) {
					throw error;
				}
				throw new Error("Failed to create collection");
			}
		},
		onSuccess: () => {
			// Invalidate the collections query to refetch the data
			queryClient.invalidateQueries({ queryKey: ["collections"] });
		},
	});
}

// Mutation hook to update a collection
export function useUpdateCollection() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: number;
			data: { name?: string; slug?: string };
		}) => {
			try {
				return await updateCollection(id, data);
			} catch (error) {
				if (error instanceof Error) {
					throw error;
				}
				throw new Error("Failed to update collection");
			}
		},
		onSuccess: (_data, variables) => {
			// Invalidate the specific collection query and the collections list
			queryClient.invalidateQueries({
				queryKey: ["collection", variables.id],
			});
			queryClient.invalidateQueries({ queryKey: ["collections"] });
		},
	});
}

// Mutation hook to delete a collection
export function useDeleteCollection() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			try {
				return await deleteCollection(id);
			} catch (error) {
				if (error instanceof Error) {
					throw error;
				}
				throw new Error("Failed to delete collection");
			}
		},
		onSuccess: () => {
			// Invalidate the collections query to refetch the data
			queryClient.invalidateQueries({ queryKey: ["collections"] });
		},
	});
}
