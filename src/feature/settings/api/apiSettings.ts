import { NextRequest, NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import {
	deleteSetting,
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
	const t = await getTranslations("Settings");
	const body = await req.json();
	const { key, value, userId } = body;

	if (!key) {
		return NextResponse.json({ error: "key missing" }, { status: 400 });
	}

	if (!value) {
		await deleteSetting(key);
	} else if (userId) {
		await setUserSetting(key, value, userId);
	} else {
		await setSetting(key, value);
	}

	const successMessage = t("UpdateSuccess", { key });
	return NextResponse.json({ message: successMessage }, { status: 200 });
}
