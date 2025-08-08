import React from "react";
import { BaseComponent } from "@/builder/types/components/component";

export const DragDropContext = React.createContext<{
	targetComponent: string | null;
	setTargetComponent: (id: string | null) => void;
	sourceComponent: BaseComponent | null;
	setSourceComponent: (component: BaseComponent | null) => void;
	reorderComponents: (
		parentId: string | null,
		sourceId: string,
		targetId: string,
	) => void;
} | null>(null);
