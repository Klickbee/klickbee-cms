import { useEffect, useState } from "react";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { DynamicItemsContentProps } from "@/builder/types/contentCategories";
import { useContentProps } from "./useContentProps";
import { useContentUpdate } from "./useContentUpdate";

export function useDynamicItemsContent<
	T extends Partial<ComponentContentProps>,
>(component: BuilderComponent, additionalDefaults?: T) {
	const defaults = {
		items: CONTENT_DEFAULTS.DEFAULT_LIST_ITEMS,
		...additionalDefaults,
	};

	const contentProps = useContentProps(component, defaults);
	const { updateItems, ...otherUpdaters } = useContentUpdate(component);

	const [localItems, setLocalItems] = useState<string[]>(
		contentProps.items || [],
	);

	useEffect(() => {
		if (contentProps.items) {
			setLocalItems(contentProps.items);
		}
	}, [contentProps.items]);

	const generateNewItem = (
		currentItems: string[],
		basePrefix = "List Radio",
	) => {
		return `${basePrefix} ${currentItems.length + 1}`;
	};

	const handleAddItem = (basePrefix?: string) => {
		const newItems = [
			...localItems,
			generateNewItem(localItems, basePrefix),
		];
		setLocalItems(newItems);
		updateItems(newItems);
	};

	const handleRemoveItem = (index: number, minItems = 1) => {
		if (localItems.length > minItems) {
			const newItems = localItems.filter((_, i) => i !== index);
			setLocalItems(newItems);
			updateItems(newItems);
		}
	};

	const handleItemChange = (index: number, value: string) => {
		const newItems = localItems.map((item, i) =>
			i === index ? value : item,
		);
		setLocalItems(newItems);
		updateItems(newItems);
	};

	const handleReorderItems = (fromIndex: number, toIndex: number) => {
		const newItems = [...localItems];
		const [removed] = newItems.splice(fromIndex, 1);
		newItems.splice(toIndex, 0, removed);
		setLocalItems(newItems);
		updateItems(newItems);
	};

	return {
		dynamicItemsProps: {
			items: localItems,
		} as DynamicItemsContentProps,

		...contentProps,

		handleAddItem,
		handleItemChange,
		handleRemoveItem,
		handleReorderItems,
		items: localItems,

		itemsActions: {
			generateNewItem,
			handleAddItem,
			handleItemChange,
			handleRemoveItem,
			handleReorderItems,
		},

		...otherUpdaters,
		updateItems,
	};
}
