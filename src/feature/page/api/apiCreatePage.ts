import { NextRequest, NextResponse } from "next/server";
import { createPage } from "@/feature/page/lib/pages";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		const page = await createPage(data);

		return NextResponse.json(page);
	} catch (error) {
		console.error("Error creating page:", error);
		return NextResponse.json(
			{ error: "Failed to create page" },
			{ status: 500 },
		);
	}
}
