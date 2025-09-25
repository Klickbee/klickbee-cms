import { create } from "zustand";

interface CollectionSearchStore {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	clearSearch: () => void;
}

export const useCollectionSearchStore = create<CollectionSearchStore>(
	(set) => ({
		clearSearch: () => set({ searchQuery: "" }),
		searchQuery: "",
		setSearchQuery: (query) => set({ searchQuery: query }),
	}),
);
