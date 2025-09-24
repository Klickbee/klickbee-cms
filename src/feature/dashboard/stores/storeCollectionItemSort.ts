import { create } from "zustand";

interface CollectionItemFilterStore {
	filterBy: string;
	setFilterBy: (filter: string) => void;
}

export const useCollectionItemFilterStore = create<CollectionItemFilterStore>(
	(set) => ({
		filterBy: "all",
		setFilterBy: (filter: string) => set({ filterBy: filter }),
	}),
);
