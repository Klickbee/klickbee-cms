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
import { useFooterEditor } from "@/feature/page/_footer/hooks/useFooterEditor";
import { useHeaderEditor } from "@/feature/page/_header/hooks/useHeaderEditor";

/**
 * Hook to handle style property updates in the builder store
 */

export function useStyleUpdate(component: BuilderComponent) {
	const setCurrentComponent = useCurrentComponentStore(
		(state) => state.setCurrentComponent,
	);

	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);

	const pageId =
		currentPage?.id && currentPage.id > 0 ? currentPage.id : undefined;
	const headerEditor = useHeaderEditor(pageId);
	const footerEditor = useFooterEditor(pageId);

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

			// Update the current component selection in the store for sidebar sync
			setCurrentComponent(updatedComponent);

			// Determine if the node lives in header or footer, and route updates
			try {
				if (pageId && headerEditor.containsNode(updatedComponent.id)) {
					headerEditor.pasteStyle(
						updatedComponent.id,
						(updatedComponent.props.style || {}) as Record<
							string,
							unknown
						>,
					);
					return;
				}
				if (pageId && footerEditor.containsNode(updatedComponent.id)) {
					footerEditor.pasteStyle(
						updatedComponent.id,
						(updatedComponent.props.style || {}) as Record<
							string,
							unknown
						>,
					);
					return;
				}
			} catch {
				// Intentionally ignore errors from header/footer editors
			}

			// Otherwise update the page body content tree
			const newPageContent = updatePageContent(
				currentPage.content,
				component.id,
				updatedComponent,
			);
			if (newPageContent !== currentPage.content) {
				setCurrentPage({ ...currentPage, content: newPageContent });
			}
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

// Update a single-root (header/footer) tree
function _updateSingleRoot(
	root: BuilderComponent,
	componentId: string,
	componentContent: BuilderComponent,
): BuilderComponent {
	const updateNode = (node: BuilderComponent): BuilderComponent => {
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
		if (node.children && node.children.length) {
			return {
				...node,
				children: (node.children as BuilderComponent[]).map(updateNode),
			};
		}
		return node;
	};
	return updateNode(root);
}

function _containsComponentId(
	root: BuilderComponent,
	targetId: string,
): boolean {
	if (!root) return false;
	if (root.id === targetId) return true;
	if (root.children && (root.children as BuilderComponent[]).length) {
		return (root.children as BuilderComponent[]).some((child) =>
			_containsComponentId(child, targetId),
		);
	}
	return false;
}
