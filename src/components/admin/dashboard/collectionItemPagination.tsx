"use client";

import TanStackPagination from "@/components/admin/_partials/tanstackPagination";
import { useCollectionItemTable } from "@/feature/dashboard/hooks/useCollectionItemTable";

export default function CollectionItemPagination() {
	const table = useCollectionItemTable();

	return <TanStackPagination table={table} />;
}
