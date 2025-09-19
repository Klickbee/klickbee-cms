"use client";

import { useEffect } from "react";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { useDuplicateComponent } from "@/builder/hooks/useDuplicateComponent";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";

export function useBuilderShortcuts() {
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);
	const { duplicateComponent } = useDuplicateComponent();
	const { confirmDelete } = useDeleteComponentContext();
	const undo = useCurrentPageStore((s) => s.undo);
	const redo = useCurrentPageStore((s) => s.redo);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
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
				confirmDelete(currentComponent.id, null, currentComponent.type);
				return;
			}

			// Ctrl + D duplicate
			if ((e.ctrlKey || e.metaKey) && (e.key === "d" || e.key === "D")) {
				e.preventDefault();
				duplicateComponent(currentComponent.id);
			}
		};

		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [currentComponent, duplicateComponent, confirmDelete, undo, redo]);
}
