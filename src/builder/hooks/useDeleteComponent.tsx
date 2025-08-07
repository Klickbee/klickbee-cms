import { JsonValue } from "@prisma/client/runtime/library";
import { useState } from "react";
import { toast } from "sonner";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import {
	BaseComponent,
	BuilderComponent,
} from "@/builder/types/components/component";

interface UseDeleteComponentOptions {
	showNotifications?: boolean;
}

export function useDeleteComponent(options: UseDeleteComponentOptions = {}) {
	const { showNotifications = true } = options;
	const { currentPage, setCurrentPage } = useCurrentPageStore();
	const [componentToDelete, setComponentToDelete] = useState<string | null>(
		null,
	);
	const [componentTypeToDelete, setComponentTypeToDelete] = useState<
		string | null
	>(null);
	const [parentIdToDelete, setParentIdToDelete] = useState<string | null>(
		null,
	);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

	// Function to delete a component by ID
	const deleteComponent = (componentId: string, parentId: string | null) => {
		// Get the current content as an array
		if (!Array.isArray(currentPage.content)) {
			return;
		}

		const currentContent: BaseComponent[] = [...currentPage.content];

		// Function to find and delete a component within the hierarchy
		const findAndDeleteComponent = (
			components: BaseComponent[],
			parent: BaseComponent | null,
		): boolean => {
			// If we're looking at the right parent (or root level)
			if (
				(parent === null && parentId === null) ||
				(parent && parent.id === parentId)
			) {
				// Find the component to delete
				const componentIndex = components.findIndex(
					(c) => c.id === componentId,
				);

				if (componentIndex !== -1) {
					// Remove the component
					components.splice(componentIndex, 1);

					// Update order values for all components in this parent
					components.forEach((component, index) => {
						component.order = index + 1;
					});

					return true;
				}
				return false;
			}

			// Recursively check children
			for (let i = 0; i < components.length; i++) {
				if (
					components[i].children &&
					findAndDeleteComponent(
						components[i].children as BuilderComponent[],
						components[i],
					)
				) {
					return true;
				}
			}

			return false;
		};

		// Try to delete the component
		const result = findAndDeleteComponent(currentContent, null);

		if (result) {
			// Update the current page with the modified content
			const updatedPage = {
				...currentPage,
				content: currentContent,
			};
			setCurrentPage(updatedPage);

			// Show a notification to remind the user to save changes (if enabled)
			if (showNotifications) {
				toast.success("Component deleted successfully", {
					description: "Remember to save your changes (Ctrl+S)",
					duration: 3000,
				});
			}
		} else if (showNotifications) {
			toast.error("Failed to delete component", {
				description: "Please try again or refresh the page",
				duration: 3000,
			});
		}
	};

	// Function to open the confirmation dialog
	const confirmDelete = (
		componentId: string,
		parentId: string | null = null,
		componentType: string | null = null,
	) => {
		setComponentToDelete(componentId);
		setComponentTypeToDelete(componentType);
		setParentIdToDelete(parentId);
		setIsConfirmDialogOpen(true);
	};

	// Function to cancel deletion
	const cancelDelete = () => {
		setComponentToDelete(null);
		setComponentTypeToDelete(null);
		setParentIdToDelete(null);
		setIsConfirmDialogOpen(false);
	};

	// Function to confirm and execute deletion
	const handleDelete = () => {
		if (componentToDelete) {
			deleteComponent(componentToDelete, parentIdToDelete);
			setIsConfirmDialogOpen(false);
			setComponentToDelete(null);
			setComponentTypeToDelete(null);
			setParentIdToDelete(null);
		}
	};

	return {
		cancelDelete,
		componentToDelete,
		componentTypeToDelete,
		confirmDelete,
		handleDelete,
		isConfirmDialogOpen,
		setIsConfirmDialogOpen,
	};
}
