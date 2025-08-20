import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/feature/auth/lib/auth";

async function getSession() {
	try {
		return await auth.api.getSession({
			headers: await headers(),
		});
	} catch (error) {
		console.error("Error getting session:", error);
		return null;
	}
}

export async function isAuthenticatedGuard() {
	try {
		const session = await getSession();

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
