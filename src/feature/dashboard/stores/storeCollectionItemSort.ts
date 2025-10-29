import { create } from "zustand";

interface CollectionItemSortStore {
	sortBy: string;
	setSortBy: (sort: string) => void;
}

export const useCollectionItemSortStore = create<CollectionItemSortStore>(
	(set) => ({
		setSortBy: (sort: string) => set({ sortBy: sort }),
		sortBy: "all",
	}),
);
