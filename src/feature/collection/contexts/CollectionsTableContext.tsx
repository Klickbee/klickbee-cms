"use client";

import { createContext, ReactNode, useContext } from "react";
import { useCollectionsTable } from "@/feature/collection/hooks/useCollectionsTable";

type CollectionsTableContextType = {
	table: ReturnType<typeof useCollectionsTable>;
};

const CollectionsTableContext = createContext<
	CollectionsTableContextType | undefined
>(undefined);

export function CollectionsTableProvider({
	children,
}: {
	children: ReactNode;
}) {
	const table = useCollectionsTable();

	return (
		<CollectionsTableContext.Provider value={{ table }}>
			{children}
		</CollectionsTableContext.Provider>
	);
}

export function useCollectionsTableContext() {
	const context = useContext(CollectionsTableContext);
	if (context === undefined) {
		throw new Error(
			"useCollectionsTableContext must be used within a CollectionsTableProvider",
		);
	}
	return context.table;
}
