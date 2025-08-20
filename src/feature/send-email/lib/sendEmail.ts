import nodemailer from "nodemailer";
import { getSetting } from "@/feature/settings/lib/settings";
import { decryptString } from "@/lib/crypto";

export interface EmailOptions {
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
	const { to, subject, text, html } = options;

	const emailHost = await getSetting("emailHost");
	const emailPort = await getSetting("emailPort");
	const emailSecure = await getSetting("emailSecure");
	const emailUsername = await getSetting("emailUsername");
	const emailPassword = await getSetting("emailPassword");
	const emailSender = await getSetting("emailSender");
	const validPort = parseInt(emailPort || "587", 10);

	const transporter = nodemailer.createTransport({
		auth: {
			pass: await decryptString(emailPassword || ""),
			user: emailUsername || "",
		},
		host: emailHost || "",
		port: validPort,
		secure:
			emailSecure !== undefined
				? emailSecure === "true"
				: validPort === 465,
	});

	await transporter.sendMail({
		from: emailSender || "",
		html,
		subject,
		text,
		to,
	});
}
