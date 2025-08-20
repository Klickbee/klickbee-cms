import { create } from "zustand";

interface ContactSelectionStore {
	selectedItems: string[];
	addSelection: (id: string) => void;
	removeSelection: (id: string) => void;
	toggleSelection: (id: string) => void;
	clearSelection: () => void;
	setSelectedItems: (ids: string[]) => void;
}

export const useContactSelectionStore = create<ContactSelectionStore>(
	(set, get) => ({
		addSelection: (id) =>
			set((state) => ({
				selectedItems: [...state.selectedItems, id],
			})),
		clearSelection: () => set({ selectedItems: [] }),
		removeSelection: (id) =>
			set((state) => ({
				selectedItems: state.selectedItems.filter(
					(item) => item !== id,
				),
			})),
		selectedItems: [],
		setSelectedItems: (ids) => set({ selectedItems: ids }),
		toggleSelection: (id) => {
			const { selectedItems, addSelection, removeSelection } = get();
			if (selectedItems.includes(id)) {
				removeSelection(id);
			} else {
				addSelection(id);
			}
		},
	}),
);
