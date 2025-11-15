import { create } from "zustand";

export type ActiveBreakpoint = {
	name: string;
	width: number;
};

interface ActiveBreakpointStore {
	active: ActiveBreakpoint | null;
	setActive: (bp: ActiveBreakpoint | null) => void;
}

export const useActiveBreakpointStore = create<ActiveBreakpointStore>(
	(set) => ({
		active: null,
		setActive: (bp) => set({ active: bp }),
	}),
);
