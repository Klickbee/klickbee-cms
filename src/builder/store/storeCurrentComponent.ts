import { create } from "zustand";
import { BuilderComponent } from "@/builder/types/components/components";

type CurrentComponentStore = {
	currentComponent: BuilderComponent;
	setCurrentComponent: (componentItem: BuilderComponent) => void;
	clearCurrentComponent: () => void;
};

export const useCurrentComponentStore = create<CurrentComponentStore>(
	(set) => ({
		clearCurrentComponent: () =>
			set({
				currentComponent: {
					children: [],
					groupId: "",
					id: "none",
					label: "",
					props: {
						content: {},
						style: {},
					},
					type: "undefined",
				},
			}),
		currentComponent: {
			children: [],
			groupId: "",
			id: "none",
			label: "",
			props: {
				content: {},
				style: {},
			},
			type: "undefined",
		},
		setCurrentComponent: (componentItem: BuilderComponent) =>
			set({ currentComponent: componentItem }),
	}),
);
