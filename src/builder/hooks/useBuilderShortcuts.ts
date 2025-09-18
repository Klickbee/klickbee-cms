"use client";

import { useEffect } from "react";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { useDuplicateComponent } from "@/builder/hooks/useDuplicateComponent";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";

export function useBuilderShortcuts() {
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);
	const { duplicateComponent } = useDuplicateComponent();
	const { confirmDelete } = useDeleteComponentContext();

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
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
	}, [currentComponent, duplicateComponent, confirmDelete]);
}
