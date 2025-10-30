"use client";
import { useEffect } from "react";
import { useCurrentUser } from "@/feature/user/queries/useUser";
import { useUserStore } from "@/feature/user/stores/storeUser";

export function UserProvider({ children }: { children: React.ReactNode }) {
	const { data: user, error } = useCurrentUser();
	const { user: storeUser, setUser } = useUserStore();

	useEffect(() => {
		if (
			user &&
			(!storeUser ||
				storeUser.id !== user.id ||
				storeUser.email !== user.email)
		) {
			setUser(user);
		}
		if ((!user || error) && storeUser !== null) {
			setUser(null);
		}
	}, [user, error, setUser, storeUser]);

	return <>{children}</>;
}
