import { create } from "zustand";

export type CollectionItemFilterType =
	| "all"
	| "published"
	| "draft"
	| "scheduled";

interface CollectionItemFilterStore {
	filterBy: CollectionItemFilterType;
	setFilterBy: (filter: CollectionItemFilterType) => void;
}

export const useCollectionItemFilterStore = create<CollectionItemFilterStore>(
	(set) => ({
		filterBy: "all",
		setFilterBy: (filter) => set({ filterBy: filter }),
	}),
);
