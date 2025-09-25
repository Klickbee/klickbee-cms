import { create } from "zustand";

export type UserFilterType = "all" | "active" | "inactive" | "admin" | "user";

interface UserFilterState {
	filterBy: UserFilterType;
	setFilterBy: (filterBy: UserFilterType) => void;
}

export const useUserFilterStore = create<UserFilterState>((set) => ({
	filterBy: "all",
	setFilterBy: (filterBy: UserFilterType) => set({ filterBy }),
}));
