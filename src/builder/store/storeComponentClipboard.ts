import { create } from "zustand";
import { BuilderComponent } from "@/builder/types/components/components";

export type ComponentClipboard = {
	component: BuilderComponent | null;
};

interface ComponentClipboardStore {
	clipboard: ComponentClipboard | null;
	clear: () => void;
	copy: (component: BuilderComponent | null) => void;
}

export const useComponentClipboardStore = create<ComponentClipboardStore>(
	(set) => ({
		clipboard: null,
		clear: () => set({ clipboard: null }),
		copy: (component) =>
			set({
				clipboard: component
					? {
							component: JSON.parse(
								JSON.stringify(component),
							) as BuilderComponent,
						}
					: null,
			}),
	}),
);
