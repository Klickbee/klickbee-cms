"use client";
import { UseMutationResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Collection } from "@/feature/collection/types/collection";
import { slugify } from "@/lib/utils";

export const handleCreateCollection = async (
	{
		name,
		slug,
	}: {
		name: string;
		slug: string;
	},
	editingStateManager: Dispatch<SetStateAction<boolean>>,
	defaultValueStateManager: Dispatch<
		SetStateAction<{
			name: string;
			slug: string;
		}>
	>,
	createCollectionMutation: UseMutationResult<
		Collection,
		Error,
		{ name: string; slug: string },
		unknown
	>,
) => {
	if (!name || !slug) {
		toast.error("Name and slug are required");
		return;
	}

	editingStateManager(true);
	try {
		if (
			!createCollectionMutation ||
			typeof createCollectionMutation.mutateAsync !== "function"
		) {
			throw new Error("Collection mutation is not properly initialized");
		}

		await createCollectionMutation.mutateAsync({
			name: name,
			slug: slugify(slug),
		});
		defaultValueStateManager({ name: "", slug: "" });
		toast.success("Collection created successfully");
	} catch (error) {
		toast.error("Failed to create collection");
		console.error(error);
	} finally {
		editingStateManager(false);
	}
};
