import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";

export function generateAdminLink(pathToNav: string) {
	const adminKey =
		process.env.ADMIN_GENERATED_KEY || useAdminKeyStore.getState().adminKey;
	if (!adminKey) {
		throw new Error("Admin key is not retrieved");
	}
	if (pathToNav.startsWith("/")) {
		return `/admin/${adminKey}${pathToNav}`;
	} else {
		return `/admin/${adminKey}/${pathToNav}`;
	}
}

// Keeping this for backward compatibility if needed elsewhere
export function useAdminKey() {
	return (
		process.env.ADMIN_GENERATED_KEY ||
		useAdminKeyStore((state) => state.adminKey)
	);
}
