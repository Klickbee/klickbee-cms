"use client";

import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { useDynamicItemsContent } from "@/builder/hooks/useDynamicItemsContent";
import { BuilderComponent } from "@/builder/types/components/components";
import { ListType } from "@/builder/types/components/properties/componentContentPropsType";
import DynamicItemsList from "../layout/DynamicItemsList";
import PropertySelect from "../layout/PropertySelect";

interface ListContentProps {
	component: BuilderComponent;
}

export default function ListContent({ component }: ListContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { listType } = useContentProps(component, {
		listType: CONTENT_DEFAULTS.DEFAULT_LIST_TYPE as ListType,
	});

	const { updateSingleField } = useContentUpdate(component);
	const { items, itemsActions } = useDynamicItemsContent(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertySelect
				label={t("listType")}
				layout="row"
				onChange={(value) =>
					updateSingleField(
						"listType",
						value as "bulleted" | "numbered",
					)
				}
				options={[
					{ label: t("bulleted"), value: "bulleted" },
					{ label: t("numbered"), value: "numbered" },
				]}
				value={listType as string}
			/>

			<DynamicItemsList
				items={items}
				label={t("items")}
				minItems={1}
				onAddItem={itemsActions.handleAddItem}
				onItemChange={itemsActions.handleItemChange}
				onRemoveItem={itemsActions.handleRemoveItem}
				placeholderPrefix={t("listText")}
			/>
		</div>
	);
}
