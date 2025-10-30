"use client";

import TanStackPagination from "@/components/admin/_partials/tanstackPagination";
import { useContactsTableContext } from "@/feature/contact/contexts/ContactsTableContext";

export default function ContactsPagination() {
	const table = useContactsTableContext();

	return <TanStackPagination table={table} />;
}
