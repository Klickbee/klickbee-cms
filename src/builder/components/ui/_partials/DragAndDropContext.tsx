import React from "react";

export const DragDropContext = React.createContext<{
	targetComponent: string | null;
	setTargetComponent: (id: string | null) => void;
} | null>(null);
