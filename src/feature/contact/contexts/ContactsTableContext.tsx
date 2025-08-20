"use client";

import { createContext, ReactNode, useContext } from "react";
import { useContactsTable } from "@/feature/contact/hooks/useContactTable";

type ContactsTableContextType = {
	table: ReturnType<typeof useContactsTable>;
};

const ContactsTableContext = createContext<
	ContactsTableContextType | undefined
>(undefined);

export function ContactsTableProvider({ children }: { children: ReactNode }) {
	const table = useContactsTable();

	return (
		<ContactsTableContext.Provider value={{ table }}>
			{children}
		</ContactsTableContext.Provider>
	);
}

export function useContactsTableContext() {
	const context = useContext(ContactsTableContext);
	if (context === undefined) {
		throw new Error(
			"useContactsTableContext must be used within a ContactsTableProvider",
		);
	}
	return context.table;
}
