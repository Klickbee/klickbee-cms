"use client";

import { useDynamicItemsContent } from "@/builder/hooks/useDynamicItemsContent";
import { useFormFieldContent } from "@/builder/hooks/useFormFieldContent";
import { BuilderComponent } from "@/builder/types/components/components";
import DynamicItemsList from "../layout/DynamicItemsList";
import FormFieldGroup from "../layout/FormFieldGroup";

interface RadioGroupContentProps {
	component: BuilderComponent;
}

export default function RadioGroupContent({
	component,
}: RadioGroupContentProps) {
	const { formProps, updateFormField } = useFormFieldContent(component);
	const { items, itemsActions } = useDynamicItemsContent(component);

	return (
		<div className="flex flex-col gap-3">
			<FormFieldGroup
				label={formProps.label}
				name={formProps.name}
				onLabelChange={updateFormField.updateLabel}
				onNameChange={updateFormField.updateName}
				onRequiredChange={updateFormField.updateRequired}
				required={formProps.required}
			/>

			<DynamicItemsList
				items={items}
				label="Items"
				minItems={1}
				onAddItem={itemsActions.handleAddItem}
				onItemChange={itemsActions.handleItemChange}
				onRemoveItem={itemsActions.handleRemoveItem}
				placeholderPrefix="List Radio"
			/>
		</div>
	);
}
