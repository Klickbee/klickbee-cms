"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import CollectionItemForm from "@/components/admin/manage/collectionItems/collectionItemForm";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useCreateCollectionItem } from "@/feature/collectionItem/queries/useCreateCollectionItem";
import {
	CreateCollectionItemFormValues,
	createCollectionItemSchema,
} from "@/feature/collectionItem/schemas/createCollectionItemSchema";

interface CollectionItemCreateFormProps {
	collectionSlug: string;
}
export default function CollectionItemCreateForm({
	collectionSlug,
}: CollectionItemCreateFormProps) {
	const t = useTranslations("CollectionItems");
	const router = useRouter();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const createCollectionItemMutation =
		useCreateCollectionItem(collectionSlug);

	const handleSubmit = async (values: FieldValues) => {
		try {
			await createCollectionItemMutation.mutateAsync(
				values as CreateCollectionItemFormValues,
				{
					onError: (error) => {
						console.error("Error creating collection item:", error);
						toast.error(t("CreateCollectionItemError"));
					},
					onSuccess: () => {
						toast.success(t("CreateCollectionItemSuccess"));
						router.push(
							`/admin/${adminKey}/manage/content/${collectionSlug}/items`,
						); // Redirect to collection items list
					},
				},
			);
		} catch (error) {
			console.error("Error creating collection item:", error);
			toast.error(t("CreateCollectionItemError"));
		}
	};

	const initialValues = {
		collectionSlug,
		// content: JSON.stringify({ key: "value" }),
		isPublished: false,
		metaDescription: "",
		metaTitle: "",
		publishedAt: "",
		slug: "",
	};

	return (
		<CollectionItemForm
			initialValues={initialValues}
			onSubmit={handleSubmit}
			schema={createCollectionItemSchema}
		/>
	);
}
