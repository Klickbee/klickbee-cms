import { queryOptions } from "@tanstack/react-query";
import { headers } from "next/headers";
import { auth } from "@/feature/auth/lib/auth";

export async function getCurrentUser() {
	try {
		const headersList = await headers();
		const session = await auth.api.getSession({
			headers: headersList,
		});
		return session?.user || null;
	} catch (error) {
		console.error("Error in getCurrentUser:", error);
		return null;
	}
}

export const userServerOptions = queryOptions({
	queryFn: async () => await getCurrentUser(),
	queryKey: ["current_user"],
});
