import { create } from "zustand";
import { PageLight } from "@/feature/page/types/page";

type CurrentPageStore = {
	currentPage: PageLight;
	setCurrentPage: (page: PageLight) => void;
	clearCurrentPage: () => void;
};

export const useCurrentPageStore = create<CurrentPageStore>((set) => ({
	clearCurrentPage: () =>
		set({
			currentPage: {
				id: -1,
				slug: "",
				title: "",
			},
		}),
	currentPage: {
		id: -1,
		slug: "",
		title: "",
	},
	setCurrentPage: (page: PageLight) => set({ currentPage: page }),
}));
