"use client";

import TanStackPagination from "@/components/admin/_partials/tanstackPagination";
import { useUsersTable } from "@/feature/user/hooks/useUsersTable";

export default function UsersPagination() {
	const table = useUsersTable();

	return <TanStackPagination table={table} />;
}
