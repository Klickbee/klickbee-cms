import { InputJsonValue, JsonValue } from "@prisma/client/runtime/library";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Prisma } from "@/generated/prisma";
import {
	createTemplate,
	deleteTemplate,
	updateTemplate,
} from "../actions/collectionActions";
import { CollectionTemplate } from "../types/collection";

import JsonNull = Prisma.NullTypes.JsonNull;

// Mutation hook to create a new template
export function useCreateTemplate() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			name: string;
			content: JsonNull | InputJsonValue;
			collectionId: number;
		}) => {
			try {
				return await createTemplate(data);
			} catch (error) {
				if (error instanceof Error) {
					throw error;
				}
				throw new Error("Failed to create template");
			}
		},
		onSuccess: (_data, variables) => {
			// Invalidate the collection query to refetch the data with the new template
			queryClient.invalidateQueries({
				queryKey: ["collection", variables.collectionId],
			});
			queryClient.invalidateQueries({
				queryKey: ["collections"],
			});
		},
	});
}

// Mutation hook to update a template
export function useUpdateTemplate() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			collectionId,
			data,
		}: {
			id: number;
			collectionId: number;
			data: { name?: string; content?: JsonNull | InputJsonValue };
		}) => {
			try {
				return await updateTemplate(id, data);
			} catch (error) {
				if (error instanceof Error) {
					throw error;
				}
				throw new Error("Failed to update template");
			}
		},
		onSuccess: (_data, variables) => {
			// Invalidate the collection query to refetch the data with the updated template
			queryClient.invalidateQueries({
				queryKey: ["collection", variables.collectionId],
			});
			queryClient.invalidateQueries({
				queryKey: ["collections"],
			});
		},
	});
}

// Mutation hook to delete a template
export function useDeleteTemplate() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			collectionId,
		}: {
			id: number;
			collectionId: number;
		}) => {
			try {
				// Only pass the id to the server action
				return await deleteTemplate(id);
			} catch (error) {
				if (error instanceof Error) {
					throw error;
				}
				throw new Error("Failed to delete template");
			}
		},
		onSuccess: (_data, variables) => {
			// Use collectionId for cache invalidation
			queryClient.invalidateQueries({
				queryKey: ["collection", variables.collectionId],
			});
			queryClient.invalidateQueries({
				queryKey: ["collections"],
			});
		},
	});
}
