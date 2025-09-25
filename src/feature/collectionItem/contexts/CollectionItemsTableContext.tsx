"use client";

import { createContext, ReactNode, useContext } from "react";
import { useCollectionItemsTable } from "@/feature/collectionItem/hooks/useCollectionItemsTable";

type CollectionItemsTableContextType = {
	table: ReturnType<typeof useCollectionItemsTable>;
};

const CollectionItemsTableContext = createContext<
	CollectionItemsTableContextType | undefined
>(undefined);

export function CollectionItemsTableProvider({
	children,
	collectionSlug,
}: {
	children: ReactNode;
	collectionSlug: string;
}) {
	const table = useCollectionItemsTable(collectionSlug);

	return (
		<CollectionItemsTableContext.Provider value={{ table }}>
			{children}
		</CollectionItemsTableContext.Provider>
	);
}

export function useCollectionItemsTableContext() {
	const context = useContext(CollectionItemsTableContext);
	if (context === undefined) {
		throw new Error(
			"useCollectionItemsTableContext must be used within a CollectionItemsTableProvider",
		);
	}
	return context.table;
}
