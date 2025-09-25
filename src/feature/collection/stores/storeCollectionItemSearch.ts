import { create } from "zustand";

interface CollectionItemSearchStore {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	clearSearch: () => void;
}

export const useCollectionItemSearchStore = create<CollectionItemSearchStore>(
	(set) => ({
		clearSearch: () => set({ searchQuery: "" }),
		searchQuery: "",
		setSearchQuery: (query) => set({ searchQuery: query }),
	}),
);
