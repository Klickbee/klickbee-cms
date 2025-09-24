"use client";

import { createContext, ReactNode, useContext } from "react";
import { usePagesTable } from "@/feature/page/hooks/usePagesTable";

type PagesTableContextType = {
	table: ReturnType<typeof usePagesTable>;
};

const PagesTableContext = createContext<PagesTableContextType | undefined>(
	undefined,
);

export function PagesTableProvider({ children }: { children: ReactNode }) {
	const table = usePagesTable();

	return (
		<PagesTableContext.Provider value={{ table }}>
			{children}
		</PagesTableContext.Provider>
	);
}

export function usePagesTableContext() {
	const context = useContext(PagesTableContext);
	if (context === undefined) {
		throw new Error(
			"usePagesTableContext must be used within a PagesTableProvider",
		);
	}
	return context.table;
}
