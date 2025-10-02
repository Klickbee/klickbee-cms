"use server";

import { NextRequest, NextResponse } from "next/server";
import { extractFileMetadata } from "../lib/mediaMetadata";

export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url);
		const fileName = url.searchParams.get("fileName");
		const fileUrl = url.searchParams.get("fileUrl");

		if (!fileName || !fileUrl) {
			return NextResponse.json(
				{ error: "fileName and fileUrl are required" },
				{ status: 400 },
			);
		}

		const metadata = await extractFileMetadata(fileName, fileUrl);
		return NextResponse.json(metadata);
	} catch (error) {
		console.error("Error extracting media metadata:", error);
		return NextResponse.json(
			{ error: "Failed to extract metadata" },
			{ status: 500 },
		);
	}
}
