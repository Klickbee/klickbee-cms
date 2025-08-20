import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import {
	getSetting,
	setSetting,
	setUserSetting,
} from "@/feature/settings/lib/settings";

export async function GET(req: NextRequest) {
	// Vérification de l'authentification
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}
	const { searchParams } = new URL(req.url);
	const key = searchParams.get("key");
	const userId = searchParams.get("userId");

	if (!key) {
		return NextResponse.json({ error: "missing key" }, { status: 400 });
	}

	const value = await getSetting(key, userId);
	return NextResponse.json({ value });
}

export async function POST(req: NextRequest) {
	// Vérification de l'authentification
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}
	const body = await req.json();
	const { key, value, userId } = body;

	if (!key || !value) {
		return NextResponse.json(
			{ error: "key or value missing" },
			{ status: 400 },
		);
	}

	if (userId) {
		await setUserSetting(key, value, userId);
	} else {
		await setSetting(key, value);
	}

	const successMessage = `Setting ${key} updated successfully`;
	return NextResponse.json({ message: successMessage }, { status: 200 });
}
