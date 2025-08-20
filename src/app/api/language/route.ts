// This file will be removed in the first release, just for development purposes

import { NextRequest, NextResponse } from "next/server";
import { getSetting, setSetting } from "@/feature/settings/lib/settings";

export async function GET(req: NextRequest) {
	const locale = await getSetting("system_lang");
	return NextResponse.json({ locale: locale || "en" });
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { locale } = body;

	if (!locale) {
		return NextResponse.json({ error: "locale missing" }, { status: 400 });
	}

	// Only allow valid locales
	if (locale !== "en" && locale !== "fr") {
		return NextResponse.json({ error: "invalid locale" }, { status: 400 });
	}

	await setSetting("system_lang", locale);

	return NextResponse.json({ locale }, { status: 200 });
}
