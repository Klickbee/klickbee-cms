"use client";

import { useCallback } from "react";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { BuilderComponent } from "@/builder/types/components/components";
import {
	BoxShadowStyle,
	ComponentStyleProps,
	EffectsStyle,
	TextShadowStyle,
} from "@/builder/types/components/properties/componentStylePropsType";

/**
 * Hook to handle style property updates in the builder store
 */
export function useStyleUpdate(component: BuilderComponent) {
	const setCurrentComponent = useCurrentComponentStore(
		(state) => state.setCurrentComponent,
	);

	const updateStyle = useCallback(
		(updates: Partial<ComponentStyleProps>) => {
			// Update the component's style properties
			const updatedComponent: BuilderComponent = {
				...component,
				props: {
					...component.props,
					style: {
						...component.props.style,
						...updates,
					},
				},
			};

			// Update the current component in the store
			setCurrentComponent(updatedComponent);

			// TODO: Also need to update the component in the page content array
			// This would require a page store update to persist changes
		},
		[component, setCurrentComponent],
	);

	// Helper function for updating a single style field
	const updateSingleField = useCallback(
		<K extends keyof ComponentStyleProps>(
			field: K,
			value: ComponentStyleProps[K],
		) => {
			updateStyle({ [field]: value });
		},
		[updateStyle],
	);

	// Helper function for updating nested properties
	const updateNestedProperty = useCallback(
		<K extends keyof ComponentStyleProps>(
			field: K,
			nestedUpdate: (
				current: ComponentStyleProps[K],
			) => ComponentStyleProps[K],
		) => {
			const currentValue = component.props.style?.[field];
			const updatedValue = nestedUpdate(currentValue);
			updateSingleField(field, updatedValue);
		},
		[component.props.style, updateSingleField],
	);

	// Helper function for adding an item to an array property within effects
	const addArrayItem = useCallback(
		(
			arrayPath: keyof EffectsStyle,
			item: BoxShadowStyle | TextShadowStyle,
		) => {
			updateNestedProperty(
				"effects",
				(current: EffectsStyle | undefined) => {
					const currentEffects = current || {};
					const currentArray = Array.isArray(
						currentEffects[arrayPath],
					)
						? currentEffects[arrayPath]
						: [];
					return {
						...currentEffects,
						[arrayPath]: [...currentArray, item],
					};
				},
			);
		},
		[updateNestedProperty],
	);

	// Helper function for removing an item from an array property within effects
	const removeArrayItem = useCallback(
		(arrayPath: keyof EffectsStyle, index: number) => {
			updateNestedProperty(
				"effects",
				(current: EffectsStyle | undefined) => {
					const currentEffects = current || {};
					const currentArray = Array.isArray(
						currentEffects[arrayPath],
					)
						? currentEffects[arrayPath]
						: [];
					const newArray = currentArray.filter(
						(_: BoxShadowStyle | TextShadowStyle, i: number) =>
							i !== index,
					);
					return {
						...currentEffects,
						[arrayPath]: newArray,
					};
				},
			);
		},
		[updateNestedProperty],
	);

	// Helper function for updating a property of an array item within effects
	const updateArrayItemProperty = useCallback(
		<T extends BoxShadowStyle | TextShadowStyle>(
			arrayPath: keyof EffectsStyle,
			index: number,
			property: keyof T,
			value: T[keyof T],
		) => {
			updateNestedProperty(
				"effects",
				(current: EffectsStyle | undefined) => {
					const currentEffects = current || {};
					const currentArray = Array.isArray(
						currentEffects[arrayPath],
					)
						? currentEffects[arrayPath]
						: [];
					const newArray = [...currentArray];
					if (newArray[index]) {
						newArray[index] = {
							...newArray[index],
							[property]: value,
						} as BoxShadowStyle | TextShadowStyle;
					}
					return {
						...currentEffects,
						[arrayPath]: newArray,
					};
				},
			);
		},
		[updateNestedProperty],
	);

	return {
		addArrayItem,
		removeArrayItem,
		updateArrayItemProperty,
		updateNestedProperty,
		updateSingleField,
		updateStyle,
	};
}
