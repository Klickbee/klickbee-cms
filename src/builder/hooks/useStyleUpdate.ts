"use client";

import { useCallback } from "react";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
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

	const currentPage = useCurrentPageStore((state) => state.currentPage);

	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);

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
			currentPage.content = updatePageContent(
				currentPage.content,
				component.id,
				updatedComponent,
			);
			setCurrentPage(currentPage);
			// console.log(currentPage.content);
		},
		[component, setCurrentComponent, currentPage, setCurrentPage],
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

function updatePageContent(
	pageContent: PrismaJson.PageContentMetaType,
	componentId: string,
	componentContent: BuilderComponent,
): PrismaJson.PageContentMetaType {
	// If content is not an array, return as-is (schema allows {})

	if (!Array.isArray(pageContent)) return pageContent;

	const updateInTree = (nodes: BuilderComponent[]): BuilderComponent[] => {
		return nodes.map((node) => {
			// If this is the node to update, merge its props with the new content/style
			if (node.id === componentId) {
				return {
					...node,
					props: {
						...node.props,
						content: {
							...(node.props?.content ?? {}),
							...(componentContent.props?.content ?? {}),
						},
						style: {
							...(node.props?.style ?? {}),
							...(componentContent.props?.style ?? {}),
						},
					},
				};
			}

			// Otherwise, recurse into children if present
			if (node.children && node.children.length) {
				return {
					...node,
					children: updateInTree(node.children as BuilderComponent[]),
				};
			}

			return node;
		});
	};

	return updateInTree(pageContent as BuilderComponent[]);
}
