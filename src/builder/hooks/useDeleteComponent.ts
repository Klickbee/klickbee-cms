import { useState } from "react";
import { toast } from "sonner";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/builder/types/components/components";

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
		const currentContent: BuilderComponent[] = [...currentPage.content];

		// Function to find and delete a component within the hierarchy
		const findAndDeleteComponent = (
			components: BuilderComponent[],
			parent: BuilderComponent | null,
		): boolean => {
			// If a parentId is provided, limit deletion to that parent's direct children (or root if null)
			if (parentId !== null) {
				if (
					(parent === null && parentId === null) ||
					(parent && parent.id === parentId)
				) {
					const componentIndex = components.findIndex(
						(c) => c.id === componentId,
					);
					if (componentIndex !== -1) {
						components.splice(componentIndex, 1);
						components.forEach((component, index) => {
							component.order = index + 1;
						});
						return true;
					}
					return false;
				}
			} else {
				// No parentId provided: delete by componentId wherever it is in the tree
				const componentIndex = components.findIndex(
					(c) => c.id === componentId,
				);
				if (componentIndex !== -1) {
					components.splice(componentIndex, 1);
					components.forEach((component, index) => {
						component.order = index + 1;
					});
					return true;
				}
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

	// Function to initiate deletion immediately (no confirmation dialog)
	const confirmDelete = (
		componentId: string,
		parentId: string | null = null,
		_componentType: string | null = null,
	) => {
		// Perform deletion instantly without opening a dialog
		deleteComponent(componentId, parentId);
		// Ensure any previous dialog-related state is reset/closed
		setIsConfirmDialogOpen(false);
		setComponentToDelete(null);
		setComponentTypeToDelete(null);
		setParentIdToDelete(null);
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
