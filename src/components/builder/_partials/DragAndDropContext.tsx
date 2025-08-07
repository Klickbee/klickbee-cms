import React from "react";
import { ComponentItem } from "@/builder/definitions/componentsList";

export const DragDropContext = React.createContext<{
	targetComponent: string | null;
	setTargetComponent: (id: string | null) => void;
	sourceComponent: ComponentItem | null;
	setSourceComponent: (component: ComponentItem | null) => void;
	reorderComponents: (
		parentId: string | null,
		sourceId: string,
		targetId: string,
	) => void;
} | null>(null);
