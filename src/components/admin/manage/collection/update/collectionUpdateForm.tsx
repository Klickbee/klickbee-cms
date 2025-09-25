"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { type FieldValues } from "react-hook-form";
import { toast } from "sonner";
import CollectionForm from "@/components/admin/manage/collection/collectionForm";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useCollectionForEdit } from "@/feature/collection/queries/useCollectionForEdit";
import { useUpdateCollection } from "@/feature/collection/queries/useUpdateCollection";
import {
	UpdateCollectionFormValues,
	updateCollectionSchema,
} from "@/feature/collection/schemas/updateCollectionSchema";

interface CollectionUpdateFormProps {
	collectionSlug: string;
}

export default function CollectionUpdateForm({
	collectionSlug,
}: CollectionUpdateFormProps) {
	const { data: collection } = useCollectionForEdit(collectionSlug);
	const t = useTranslations("Contents");
	const router = useRouter();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const updateCollectionMutation = useUpdateCollection();

	const handleSubmit = async (values: FieldValues) => {
		try {
			await updateCollectionMutation.mutateAsync({
				collectionSlug,
				values: values as UpdateCollectionFormValues,
			});
			toast.success(t("UpdateCollectionSuccess"));
			router.push(`/admin/${adminKey}/manage/content`);
		} catch (error) {
			console.error("Error updating collection:", error);
			toast.error(t("UpdateCollectionError"));
		}
	};

	if (!collection) {
		return <div>Error loading collection</div>;
	}

	return (
		<CollectionForm
			initialValues={{
				name: collection.name,
				slug: collection.slug,
			}}
			isSubmitting={updateCollectionMutation.isPending}
			onSubmit={handleSubmit}
			schema={updateCollectionSchema}
			submitButtonText={t("UpdateCollection")}
			submittingText={t("UpdatingCollection")}
			title={t("UpdateCollection")}
		/>
	);
}
