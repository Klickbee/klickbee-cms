import { create } from "zustand";

interface CollectionItemSearchStore {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

export const useCollectionItemSearchStore = create<CollectionItemSearchStore>(
	(set) => ({
		searchQuery: "",
		setSearchQuery: (query: string) => set({ searchQuery: query }),
	}),
);
