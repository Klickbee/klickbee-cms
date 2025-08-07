import { create } from "zustand";
import { ComponentItem } from "@/builder/definitions/componentsList";

type CurrentComponentStore = {
	currentComponent: ComponentItem;
	setCurrentComponent: (componentItem: ComponentItem) => void;
	clearCurrentComponent: () => void;
};

export const useCurrentComponentStore = create<CurrentComponentStore>(
	(set) => ({
		clearCurrentComponent: () =>
			set({
				currentComponent: {
					children: [],
					group: "",
					icon: null,
					id: "none",
					label: "",
					type: "undefined",
				},
			}),
		currentComponent: {
			children: [],
			group: "",
			icon: null,
			id: "none",
			label: "",
			type: "undefined",
		},
		setCurrentComponent: (componentItem: ComponentItem) =>
			set({ currentComponent: componentItem }),
	}),
);
