import { create } from "zustand";
import { ComponentName } from "@/feature/builder/types/components/componentMap";
import { BuilderComponent } from "@/feature/builder/types/components/components";

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
					name: "" as ComponentName,
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
			name: "" as ComponentName,
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
