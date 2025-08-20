import { create } from "zustand";

interface ContactSearchStore {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	clearSearch: () => void;
}

export const useContactSearchStore = create<ContactSearchStore>((set) => ({
	clearSearch: () => set({ searchQuery: "" }),
	searchQuery: "",
	setSearchQuery: (query) => set({ searchQuery: query }),
}));
