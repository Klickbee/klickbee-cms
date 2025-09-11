"use client";

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
	const { listType } = useContentProps(component, {
		listType: CONTENT_DEFAULTS.DEFAULT_LIST_TYPE as ListType,
	});

	const { updateSingleField } = useContentUpdate(component);
	const { items, itemsActions } = useDynamicItemsContent(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertySelect
				label="List Type"
				layout="row"
				onChange={(value) =>
					updateSingleField(
						"listType",
						value as "bulleted" | "numbered",
					)
				}
				options={[
					{ label: "Bulleted", value: "bulleted" },
					{ label: "Numbered", value: "numbered" },
				]}
				value={listType as string}
			/>

			<DynamicItemsList
				items={items}
				label="Items"
				minItems={1}
				onAddItem={itemsActions.handleAddItem}
				onItemChange={itemsActions.handleItemChange}
				onRemoveItem={itemsActions.handleRemoveItem}
				placeholderPrefix="List Text"
			/>
		</div>
	);
}
