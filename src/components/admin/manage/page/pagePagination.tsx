"use client";

import TanStackPagination from "@/components/admin/_partials/tanstackPagination";
import { usePagesTableContext } from "@/feature/page/contexts/pagesTableContext";

export default function PagesPagination() {
	const table = usePagesTableContext();

	return <TanStackPagination table={table} />;
}
