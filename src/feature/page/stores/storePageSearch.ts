import { create } from "zustand";

interface PageSearchStore {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

export const usePageSearchStore = create<PageSearchStore>((set) => ({
	searchQuery: "",
	setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
