"use client";

import { useEffect } from "react";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { useDuplicateComponent } from "@/builder/hooks/useDuplicateComponent";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { useStyleClipboardStore } from "@/builder/store/storeStyleClipboard";
import { BuilderComponent } from "@/builder/types/components/components";
import type { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";
import { useFooterEditor } from "@/feature/page/_footer/hooks/useFooterEditor";
import {
	usePageFooterByPage,
	useUpdatePageFooter,
} from "@/feature/page/_footer/queries/usePageFooter";
import { useHeaderEditor } from "@/feature/page/_header/hooks/useHeaderEditor";
import {
	usePageHeaderByPage,
	useUpdatePageHeader,
} from "@/feature/page/_header/queries/usePageHeader";
import { useUpdatePageContent } from "@/feature/page/queries/usePageActions";

declare global {
	interface Window {
		__builderHasSaveHandler?: boolean;
	}
}

function updateStyleInTree(
	list: BuilderComponent[],
	targetId: string,
	newStyle: Partial<ComponentStyleProps>,
): boolean {
	for (const node of list) {
		if (node.id === targetId) {
			const nextStyle: ComponentStyleProps = {
				...(newStyle as ComponentStyleProps),
			};
			node.props = { ...node.props, style: nextStyle };
			return true;
		}
		if (
			node.children &&
			updateStyleInTree(
				node.children as BuilderComponent[],
				targetId,
				newStyle,
			)
		) {
			return true;
		}
	}
	return false;
}

export function useBuilderShortcuts() {
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);
	const { duplicateComponent } = useDuplicateComponent();
	const { confirmDelete } = useDeleteComponentContext();
	const undo = useCurrentPageStore((s) => s.undo);
	const redo = useCurrentPageStore((s) => s.redo);
	const currentPage = useCurrentPageStore((s) => s.currentPage);
	const setCurrentPage = useCurrentPageStore((s) => s.setCurrentPage);
	const { clipboard, copy } = useStyleClipboardStore();
	const pageId =
		currentPage?.id && currentPage.id > 0 ? currentPage.id : undefined;
	const headerEditor = useHeaderEditor(pageId);
	const footerEditor = useFooterEditor(pageId);

	// Detect if the current key event should be handled by native inputs/editors
	function isEditableTarget(target: EventTarget | null): boolean {
		const el = target as HTMLElement | null;
		if (!el) return false;
		// Native inputs and textareas (any type)
		const tag = el.tagName;
		if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT")
			return true;
		// Contenteditable elements or rich text editors
		if (el.isContentEditable) return true;
		if (el.closest('[contenteditable="true"], [role="textbox"]'))
			return true;
		return false;
	}

	// Save mutations and header/footer queries
	const updatePageContentMutation = useUpdatePageContent();
	const updateHeaderMutation = useUpdatePageHeader();
	const updateFooterMutation = useUpdatePageFooter();
	const { data: pageHeader } = usePageHeaderByPage(pageId);
	const { data: pageFooter } = usePageFooterByPage(pageId);

	function isInHeader(id: string): boolean {
		try {
			return !!pageId && headerEditor.containsNode(id);
		} catch {
			return false;
		}
	}

	function isInFooter(id: string): boolean {
		try {
			return !!pageId && footerEditor.containsNode(id);
		} catch {
			return false;
		}
	}

	useEffect(() => {
		const handler = async (e: KeyboardEvent) => {
			if (e.defaultPrevented) return;

			const targetIsEditable = isEditableTarget(e.target);
			const isSaveCombo =
				(e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S");
			// When focused in an input/text editor, let the browser/app handle shortcuts except Save
			if (!isSaveCombo && targetIsEditable) {
				return;
			}

			// Save (Ctrl/Cmd + S)
			if (isSaveCombo) {
				e.preventDefault();
				try {
					// If a header save handler is present, delegate so it can manage UI (toasts, button state)
					if (
						typeof window !== "undefined" &&
						window.__builderHasSaveHandler
					) {
						window.dispatchEvent(new Event("builder:save"));
						return;
					}
					if (!currentPage || currentPage.id === -1) return;
					await updatePageContentMutation.mutateAsync({
						pageId: currentPage.id,
						content: (Array.isArray(currentPage.content)
							? currentPage.content
							: []) as unknown as BuilderComponent[],
					});
					if (pageHeader?.id) {
						await updateHeaderMutation.mutateAsync({
							pageHeaderId: pageHeader.id,
							content: (Array.isArray(pageHeader.content)
								? pageHeader.content
								: pageHeader.content
									? [pageHeader.content]
									: []) as unknown as BuilderComponent[],
						});
					}
					if (pageFooter?.id) {
						await updateFooterMutation.mutateAsync({
							pageFooterId: pageFooter.id,
							content: (Array.isArray(pageFooter.content)
								? pageFooter.content
								: pageFooter.content
									? [pageFooter.content]
									: []) as unknown as BuilderComponent[],
						});
					}
				} catch (err) {
					console.error("Save failed", err);
				}
				return;
			}

			// Undo (Ctrl/Cmd + Z)
			if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
				e.preventDefault();
				if (e.shiftKey) {
					redo();
				} else {
					undo();
				}
				return;
			}

			// Redo (Ctrl/Cmd + Y)
			if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Y")) {
				e.preventDefault();
				redo();
				return;
			}

			// Below actions require a selected component
			if (!currentComponent || currentComponent.id === "none") return;

			// Delete key
			if (e.key === "Delete") {
				e.preventDefault();
				if (isInHeader(currentComponent.id)) {
					headerEditor.deleteComponent(currentComponent.id);
				} else if (isInFooter(currentComponent.id)) {
					footerEditor.deleteComponent(currentComponent.id);
				} else {
					confirmDelete(
						currentComponent.id,
						null,
						currentComponent.type,
					);
				}
				return;
			}

			// Ctrl + D duplicate
			if ((e.ctrlKey || e.metaKey) && (e.key === "d" || e.key === "D")) {
				e.preventDefault();
				if (isInHeader(currentComponent.id)) {
					headerEditor.duplicateComponent(currentComponent.id);
				} else if (isInFooter(currentComponent.id)) {
					footerEditor.duplicateComponent(currentComponent.id);
				} else {
					duplicateComponent(currentComponent.id);
				}
				return;
			}

			// Ctrl + C copy style
			if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) {
				e.preventDefault();
				copy((currentComponent as BuilderComponent).props?.style);
				return;
			}

			// Ctrl + V paste style
			if ((e.ctrlKey || e.metaKey) && (e.key === "v" || e.key === "V")) {
				e.preventDefault();
				if (!clipboard) return;
				if (isInHeader(currentComponent.id)) {
					headerEditor.pasteStyle(
						currentComponent.id,
						clipboard as Record<string, unknown>,
					);
				} else if (isInFooter(currentComponent.id)) {
					footerEditor.pasteStyle(
						currentComponent.id,
						clipboard as Record<string, unknown>,
					);
				} else {
					const working = Array.isArray(currentPage.content)
						? (JSON.parse(
								JSON.stringify(currentPage.content),
							) as BuilderComponent[])
						: [];
					if (
						updateStyleInTree(
							working,
							currentComponent.id,
							clipboard as Record<string, unknown>,
						)
					) {
						setCurrentPage({ ...currentPage, content: working });
					}
				}
				return;
			}
		};

		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [
		currentComponent,
		duplicateComponent,
		confirmDelete,
		undo,
		redo,
		currentPage,
		pageHeader,
		pageFooter,
		updatePageContentMutation,
		updateHeaderMutation,
		updateFooterMutation,
		headerEditor,
		footerEditor,
		clipboard,
		copy,
		setCurrentPage,
	]);
}
