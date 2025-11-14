"use client";

import { createContext, useContext } from "react";
import { useCollectionItemTable } from "@/feature/dashboard/hooks/useCollectionItemTable";

type CollectionItemContextType = {
	table: ReturnType<typeof useCollectionItemTable>;
};

const CollectionItemContext = createContext<
	CollectionItemContextType | undefined
>(undefined);

export function CollectionItemProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const table = useCollectionItemTable();

	return (
		<CollectionItemContext.Provider value={{ table }}>
			{children}
		</CollectionItemContext.Provider>
	);
}

export function useCollectionItemContext() {
	const context = useContext(CollectionItemContext);
	if (context === undefined) {
		throw new Error(
			"useCollectionItemContext must be used within a CollectionItemProvider",
		);
	}
	return context.table;
}
