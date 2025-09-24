import { create } from "zustand";

interface PageSelectionStore {
	selectedItems: string[];
	setSelectedItems: (items: string[]) => void;
	clearSelection: () => void;
}

export const usePageSelectionStore = create<PageSelectionStore>((set) => ({
	clearSelection: () => set({ selectedItems: [] }),
	selectedItems: [],
	setSelectedItems: (items: string[]) => set({ selectedItems: items }),
}));
