"use client";

import TanStackPagination from "@/components/admin/_partials/tanstackPagination";
import { useCollectionItemsTableContext } from "@/feature/collectionItem/contexts/CollectionItemsTableContext";

export default function CollectionItemPagination() {
	const table = useCollectionItemsTableContext();

	return <TanStackPagination table={table} />;
}
