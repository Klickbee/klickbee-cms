import { create } from "zustand";
import { BaseComponent } from "@/builder/types/components/component";

type CurrentComponentStore = {
	currentComponent: BaseComponent;
	setCurrentComponent: (componentItem: BaseComponent) => void;
	clearCurrentComponent: () => void;
};

export const useCurrentComponentStore = create<CurrentComponentStore>(
	(set) => ({
		clearCurrentComponent: () =>
			set({
				currentComponent: {
					children: [],
					groupId: "",
					icon: null,
					id: "none",
					label: "",
					type: "undefined",
				},
			}),
		currentComponent: {
			children: [],
			groupId: "",
			icon: null,
			id: "none",
			label: "",
			type: "undefined",
		},
		setCurrentComponent: (componentItem: BaseComponent) =>
			set({ currentComponent: componentItem }),
	}),
);
