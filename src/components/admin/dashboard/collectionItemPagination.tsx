"use client";

import TanStackPagination from "@/components/admin/_partials/tanstackPagination";
import { useCollectionItemContext } from "@/feature/dashboard/contexts/collectionItemContext";

export default function CollectionItemPagination() {
	const table = useCollectionItemContext();

	return <TanStackPagination table={table} />;
}
