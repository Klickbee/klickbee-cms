"use client";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useUserStore } from "@/feature/user/stores/storeUser";

export default function AdminPage() {
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const currentUser = useUserStore((state) => state.user);

	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-muted">
			<h1 className="text-2xl font-bold">
				Admin Page with key {adminKey}
			</h1>
			{currentUser && <p>Current user id is : {currentUser.id}</p>}
		</div>
	);
}
