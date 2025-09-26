"use client";

import TanStackPagination from "@/components/admin/_partials/tanstackPagination";
import { useCollectionItemsTable } from "@/feature/collectionItem/hooks/useCollectionItemsTable";

interface CollectionItemPaginationProps {
	collectionSlug: string;
}

export default function CollectionItemPagination({
	collectionSlug,
}: CollectionItemPaginationProps) {
	const table = useCollectionItemsTable(collectionSlug);

	return <TanStackPagination table={table} />;
}
