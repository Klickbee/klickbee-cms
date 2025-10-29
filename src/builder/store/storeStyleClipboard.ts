import { create } from "zustand";

type StyleObject = Record<string, unknown> | null;

interface StyleClipboardStore {
	clipboard: StyleObject;
	copy: (style: Record<string, unknown> | undefined) => void;
	clear: () => void;
}

export const useStyleClipboardStore = create<StyleClipboardStore>((set) => ({
	clear: () => set({ clipboard: null }),
	clipboard: null,
	copy: (style) =>
		set({ clipboard: style ? JSON.parse(JSON.stringify(style)) : null }),
}));
