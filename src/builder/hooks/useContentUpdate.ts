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

			// Update page content tree (no-op if id not in page body)
			const newPageContent = updatePageContent(
				currentPage.content,
				component.id,
				updatedComponent,
			);
			if (newPageContent !== currentPage.content) {
				setCurrentPage({ ...currentPage, content: newPageContent });
			}
		},
		[component, setCurrentComponent, setCurrentPage, currentPage],
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
	if (!Array.isArray(pageContent)) return pageContent;

	let updated = false;

	const updateInTree = (nodes: BuilderComponent[]): BuilderComponent[] => {
		let anyChildChanged = false;
		const result: BuilderComponent[] = [];

		for (const node of nodes) {
			// If this is the node to update, merge its props with the new content/style
			if (node.id === componentId) {
				updated = true;
				const newNode: BuilderComponent = {
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
				result.push(newNode);
				anyChildChanged = true; // node replaced
				continue;
			}

			let newNode = node;
			if (node.children && (node.children as BuilderComponent[]).length) {
				const updatedChildren = updateInTree(
					node.children as BuilderComponent[],
				);
				if (updatedChildren !== node.children) {
					newNode = {
						...node,
						children: updatedChildren,
					};
					anyChildChanged = true;
				}
			}
			result.push(newNode);
		}

		return anyChildChanged ? result : nodes;
	};

	const updatedContent = updateInTree(pageContent as BuilderComponent[]);
	return updated ? updatedContent : pageContent;
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
