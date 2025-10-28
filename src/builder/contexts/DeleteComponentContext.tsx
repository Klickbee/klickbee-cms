"use client";

import { createContext, ReactNode, useContext } from "react";
import { useDeleteComponent } from "@/builder/hooks/useDeleteComponent";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

// Create a context for the delete component functionality
interface DeleteComponentContextType {
	confirmDelete: (
		componentId: string,
		parentId: string | null,
		componentType?: string | null,
	) => void;
	cancelDelete: () => void;
	handleDelete: () => void;
	componentTypeToDelete: string | null;
	isConfirmDialogOpen: boolean;
	setIsConfirmDialogOpen: (isOpen: boolean) => void;
}

const DeleteComponentContext = createContext<
	DeleteComponentContextType | undefined
>(undefined);

// Provider component
export function DeleteComponentProvider({ children }: { children: ReactNode }) {
	const deleteComponentHook = useDeleteComponent({
		showNotifications: false,
	});
	const {
		cancelDelete,
		handleDelete,
		componentTypeToDelete,
		isConfirmDialogOpen,
		setIsConfirmDialogOpen,
	} = deleteComponentHook;

	return (
		<DeleteComponentContext.Provider value={deleteComponentHook}>
			{children}

			{/* Shared Confirmation Dialog */}
			<Dialog
				onOpenChange={setIsConfirmDialogOpen}
				open={isConfirmDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Deletiozn</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this{" "}
							<b>
								{componentTypeToDelete
									? `${componentTypeToDelete} component`
									: "component"}
							</b>
							? This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={cancelDelete} variant="outline">
							Cancel
						</Button>
						<Button onClick={handleDelete} variant="destructive">
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</DeleteComponentContext.Provider>
	);
}

// Custom hook to use the delete component context
export function useDeleteComponentContext() {
	const context = useContext(DeleteComponentContext);
	if (context === undefined) {
		throw new Error(
			"useDeleteComponentContext must be used within a DeleteComponentProvider",
		);
	}
	return context;
}
