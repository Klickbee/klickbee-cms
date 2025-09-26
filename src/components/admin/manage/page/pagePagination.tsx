"use client";

import TanStackPagination from "@/components/admin/_partials/tanstackPagination";
import { usePagesTable } from "@/feature/page/hooks/usePagesTable";

export default function PagesPagination() {
	const table = usePagesTable();

	return <TanStackPagination table={table} />;
}
