import { create } from "zustand";

type CurrentTabStore = {
	currentTab: string;
	setCurrentTab: (tab: string) => void;
	clearCurrentTab: () => void;
};

export const useCurrentTabStore = create<CurrentTabStore>((set) => ({
	clearCurrentTab: () => set({ currentTab: "" }),
	currentTab: "",
	setCurrentTab: (tab: string) => set({ currentTab: tab }),
}));
