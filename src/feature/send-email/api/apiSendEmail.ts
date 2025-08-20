import { type NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/feature/send-email/lib/sendEmail";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { to, subject, text, html } = body;

	if (!to) {
		return NextResponse.json(
			{ error: "missing to field" },
			{ status: 400 },
		);
	}

	try {
		await sendEmail({ html, subject, text, to });

		return NextResponse.json(
			{ message: "Email sent with success" },
			{ status: 200 },
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Server error while sending email" },
			{ status: 500 },
		);
	}
}
