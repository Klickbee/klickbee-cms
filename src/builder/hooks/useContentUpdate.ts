"use client";

import { useCallback } from "react";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/builder/types/components/components";
import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";

/**
 * Hook to handle content property updates in the builder store
 */
export function useContentUpdate(component: BuilderComponent) {
	const setCurrentComponent = useCurrentComponentStore(
		(state) => state.setCurrentComponent,
	);
	const currentPage = useCurrentPageStore((state) => state.currentPage);

	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);

	const updateContent = useCallback(
		(updates: Partial<ComponentContentProps>) => {
			// Update the component's content properties
			const updatedComponent: BuilderComponent = {
				...component,
				props: {
					...component.props,
					content: {
						...component.props.content,
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
		},
		[component, setCurrentComponent, setCurrentPage],
	);

	// Helper functions for common update patterns
	const updateSingleField = useCallback(
		<K extends keyof ComponentContentProps>(
			field: K,
			value: ComponentContentProps[K],
		) => {
			updateContent({ [field]: value });
		},
		[updateContent],
	);

	const updateText = useCallback(
		(text: string) => {
			updateSingleField("text", text);
		},
		[updateSingleField],
	);

	const updateHref = useCallback(
		(href: string) => {
			updateSingleField("href", href);
		},
		[updateSingleField],
	);

	const updateRequired = useCallback(
		(required: boolean) => {
			updateSingleField("required", required);
		},
		[updateSingleField],
	);

	const updateName = useCallback(
		(name: string) => {
			updateSingleField("name", name);
		},
		[updateSingleField],
	);

	const updateLabel = useCallback(
		(label: string) => {
			updateSingleField("label", label);
		},
		[updateSingleField],
	);

	const updateItems = useCallback(
		(items: string[]) => {
			updateSingleField("items", items);
		},
		[updateSingleField],
	);

	const updateOpenInNewTab = useCallback(
		(openInNewTab: boolean) => {
			updateSingleField("openInNewTab", openInNewTab);
		},
		[updateSingleField],
	);

	const updateLevel = useCallback(
		(level: 1 | 2 | 3 | 4 | 5 | 6) => {
			updateSingleField("level", level);
		},
		[updateSingleField],
	);

	const updateSrc = useCallback(
		(src: string) => {
			updateSingleField("src", src);
		},
		[updateSingleField],
	);

	const updateAlt = useCallback(
		(alt: string) => {
			updateSingleField("alt", alt);
		},
		[updateSingleField],
	);

	const updateIcon = useCallback(
		(icon: string | React.ReactNode) => {
			updateSingleField("icon", icon);
		},
		[updateSingleField],
	);

	return {
		updateAlt,
		updateContent,
		updateHref,
		updateIcon,
		updateItems,
		updateLabel,
		updateLevel,
		updateName,
		updateOpenInNewTab,
		updateRequired,
		updateSingleField,
		updateSrc,
		// Common field updaters
		updateText,
	};
}

function updatePageContent(
	pageContent: PrismaJson.PageContentMetaType,
	componentId: string,
	componentContent: BuilderComponent,
): PrismaJson.PageContentMetaType {
	// If content is not an array, return as-is (schema allows {})
	// console.log("updatePageContent", pageContent);
	// console.log("isArray page content", Array.isArray(pageContent));

	if (!Array.isArray(pageContent)) return pageContent;

	const updateInTree = (nodes: BuilderComponent[]): BuilderComponent[] => {
		return nodes.map((node) => {
			// If this is the node to update, merge its props with the new content/style
			// console.log(node.id)
			// console.log(componentId)
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
