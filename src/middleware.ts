import { getSession } from "better-auth/api";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_KEY = process.env.ADMIN_GENERATED_KEY || "admin";
const AUTH_COOKIE_NAME = "better-auth.session_token";

const publicPages = [
	`/admin/${ADMIN_KEY}/auth/login`,
	`/admin/${ADMIN_KEY}/auth/password-reset-request`,
	`/admin/${ADMIN_KEY}/auth/password-reset`,
];

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const session = getSession();

	const response = NextResponse.next();

	const match = pathname.match(/^\/admin\/([^/]+)/);
	if (!match) return response;

	const key = match[1];

	if (key !== ADMIN_KEY) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	const isPublicPage = publicPages.some((page) => pathname.startsWith(page));
	const isAuthenticated = Boolean(
		req.cookies.get(AUTH_COOKIE_NAME) && session,
	);

	if (!isAuthenticated && !isPublicPage) {
		return NextResponse.redirect(
			new URL(`/admin/${ADMIN_KEY}/auth/login`, req.url),
		);
	}

	return response;
}

export const config = {
	matcher: ["/:path*", "/admin/:adminKey/:path*"],
};
