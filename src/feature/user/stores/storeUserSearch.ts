import { create } from "zustand";

interface UserSearchStore {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	clearSearch: () => void;
}

export const useUserSearchStore = create<UserSearchStore>((set) => ({
	clearSearch: () => set({ searchQuery: "" }),
	searchQuery: "",
	setSearchQuery: (query) => set({ searchQuery: query }),
}));
