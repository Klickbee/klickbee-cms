import { queryOptions } from "@tanstack/react-query";
import { authClient } from "@/feature/auth/lib/authClient";

async function getCurrentUser() {
	try {
		const session = await authClient.getSession();
		return session?.data?.user || null;
	} catch (error) {
		console.error("Error fetching current user:", error);
		return null;
	}
}

export const userOptions = queryOptions({
	queryFn: async () => await getCurrentUser(),
	queryKey: ["current_user"],
});
