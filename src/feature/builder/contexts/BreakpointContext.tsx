"use client";

import React, { createContext, useContext } from "react";

export type BreakpointInfo = {
	name: string;
	width: number;
};

const BreakpointContext = createContext<BreakpointInfo | null>(null);

export function BreakpointProvider({
	value,
	children,
}: {
	value: BreakpointInfo;
	children: React.ReactNode;
}) {
	return (
		<BreakpointContext.Provider value={value}>
			{children}
		</BreakpointContext.Provider>
	);
}

export function useCurrentBreakpoint(): BreakpointInfo {
	const ctx = useContext(BreakpointContext);
	if (!ctx) {
		// Fallback if provider not found; assume a large desktop width
		return { name: "default", width: 1440 };
	}
	return ctx;
}
