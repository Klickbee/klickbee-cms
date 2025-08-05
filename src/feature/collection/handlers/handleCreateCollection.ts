import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { useCreateCollection } from "@/feature/collection/queries/useCollections";
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
) => {
	const createCollectionMutation = useCreateCollection();
	if (!name || !slug) {
		toast.error("Name and slug are required");
		return;
	}

	editingStateManager(true);
	try {
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
