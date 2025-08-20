"use client";

import { createContext, ReactNode, useContext } from "react";
import { useUsersTable } from "@/feature/user/hooks/useUsersTable";

type UsersTableContextType = {
	table: ReturnType<typeof useUsersTable>;
};

const UsersTableContext = createContext<UsersTableContextType | undefined>(
	undefined,
);

export function UsersTableProvider({ children }: { children: ReactNode }) {
	const table = useUsersTable();

	return (
		<UsersTableContext.Provider value={{ table }}>
			{children}
		</UsersTableContext.Provider>
	);
}

export function useUsersTableContext() {
	const context = useContext(UsersTableContext);
	if (context === undefined) {
		throw new Error(
			"useUsersTableContext must be used within a UsersTableProvider",
		);
	}
	return context.table;
}
