"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { type FieldValues } from "react-hook-form";
import { toast } from "sonner";
import CollectionForm from "@/components/admin/manage/collection/collectionForm";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useCreateCollection } from "@/feature/collection/queries/useCreateCollection";
import {
	CreateCollectionFormValues,
	createCollectionSchema,
} from "@/feature/collection/schemas/createCollectionSchema";

export default function CollectionCreateForm() {
	const t = useTranslations("Contents");
	const router = useRouter();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const createCollectionMutation = useCreateCollection();

	const handleSubmit = async (values: FieldValues) => {
		try {
			await createCollectionMutation.mutateAsync(
				values as CreateCollectionFormValues,
				{
					onError: (error) => {
						console.error("Error creating collection:", error);
						toast.error(t("CreateCollectionError"));
					},
					onSuccess: () => {
						toast.success(t("CreateCollectionSuccess"));
						router.push(`/admin/${adminKey}/manage/content`);
					},
				},
			);
		} catch (error) {
			console.error("Error creating collection:", error);
			toast.error(t("CreateCollectionError"));
		}
	};

	return (
		<CollectionForm
			initialValues={{ name: "", slug: "" }}
			isSubmitting={createCollectionMutation.isPending}
			onSubmit={handleSubmit}
			schema={createCollectionSchema}
			submitButtonText={t("CreateCollection")}
			submittingText={t("CreatingCollection")}
			title={t("CreateCollection")}
		/>
	);
}
