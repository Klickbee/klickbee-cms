"use client";
import { Button } from "@/components/ui/button";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";

export default function AdminPagesPage() {
	const adminKey = useAdminKeyStore((state) => state.adminKey);

	return (
		<>
			<div className="flex flex-col min-h-screen items-center justify-center bg-muted">
				<Button variant={"default"}>
					<a href={`/admin/${adminKey}/builder/new`}>
						{" "}
						Create new page
					</a>
				</Button>
				<h1 className="text-2xl font-bold">Admin Pages Management</h1>
				<p className="mt-4">Manage your pages here.</p>
			</div>
		</>
	);
}
