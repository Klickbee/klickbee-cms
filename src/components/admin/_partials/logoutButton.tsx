"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { authClient } from "@/feature/auth/lib/authClient";

export default function LogoutButton() {
	const router = useRouter();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const t = useTranslations("AdminLayout");

	async function handleLogout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push(`admin/${adminKey}/auth/login`);
				},
			},
		});
	}

	return (
		<Button className="w-full" onClick={handleLogout} variant="ghost">
			{t("Logout")}
		</Button>
	);
}
