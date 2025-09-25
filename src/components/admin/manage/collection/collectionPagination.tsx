"use client";

import TanStackPagination from "@/components/admin/_partials/tanstackPagination";
import { useCollectionsTableContext } from "@/feature/collection/contexts/CollectionsTableContext";

export default function CollectionPagination() {
	const table = useCollectionsTableContext();

	return <TanStackPagination table={table} />;
}
