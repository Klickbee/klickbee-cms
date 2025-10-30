"use client";

import TanStackPagination from "@/components/admin/_partials/tanstackPagination";
import { useUsersTableContext } from "@/feature/user/contexts/UsersTableContext";

export default function UsersPagination() {
	const table = useUsersTableContext();

	return <TanStackPagination table={table} />;
}
