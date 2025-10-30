import { create } from "zustand";

type CurrentTabStore = {
	currentTab: string;
	setCurrentTab: (tab: string) => void;
	clearCurrentTab: () => void;
};

export const useCurrentTabStore = create<CurrentTabStore>((set) => ({
	clearCurrentTab: () => set({ currentTab: "" }),
	currentTab: "Pages", // Default to Pages tab
	setCurrentTab: (tab: string) => set({ currentTab: tab }),
}));
