import { getSession } from "better-auth/api";
import { NextResponse } from "next/server";

// async function getSession() {
// 	try {
// 		return await auth.api.getSession({
// 			headers: await headers(),
// 		});
// 	} catch (error) {
// 		console.error("Error getting session:", error);
// 		return null;
// 	}
// }

export async function isAuthenticatedGuard() {
	try {
		const session = getSession();

		if (!session) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		return null;
	} catch (error) {
		console.error("Error in isAuthenticatedGuard:", error);
		return NextResponse.json(
			{ error: "Authentication failed" },
			{ status: 401 },
		);
	}
}
