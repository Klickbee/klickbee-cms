import React from "react";
import { BuilderComponent } from "@/builder/types/components/components";

export const DragDropContext = React.createContext<{
	targetComponent: string | null;
	setTargetComponent: (id: string | null) => void;
	sourceComponent: BuilderComponent | null;
	setSourceComponent: (component: BuilderComponent | null) => void;
	reorderComponents: (
		parentId: string | null,
		sourceId: string,
		targetId: string,
	) => void;
} | null>(null);
