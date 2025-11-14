import { create } from "zustand";

interface CollectionItemSelectionStore {
	selectedItems: string[];
	setSelectedItems: (items: string[]) => void;
	clearSelection: () => void;
}

export const useCollectionItemSelectionStore =
	create<CollectionItemSelectionStore>((set) => ({
		clearSelection: () => set({ selectedItems: [] }),
		selectedItems: [],
		setSelectedItems: (items: string[]) => set({ selectedItems: items }),
	}));
