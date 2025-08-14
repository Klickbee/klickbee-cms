import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import {
	createTemplate,
	deleteTemplate,
	updateTemplate,
} from "../lib/collections";

export async function POST(req: NextRequest) {
	// Authentication check
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	try {
		const body = await req.json();
		const { action, id, ...data } = body;

		switch (action) {
			case "create": {
				if (!data.name || !data.content || !data.collectionId) {
					return NextResponse.json(
						{
							error: "Name, content, and collectionId are required",
						},
						{ status: 400 },
					);
				}
				const newTemplate = await createTemplate({
					collectionId: Number(data.collectionId),
					content: data.content,
					name: data.name,
				});
				return NextResponse.json(newTemplate, { status: 201 });
			}

			case "update": {
				if (!id) {
					return NextResponse.json(
						{ error: "Template ID is required" },
						{ status: 400 },
					);
				}
				const updatedTemplate = await updateTemplate(Number(id), data);
				return NextResponse.json(updatedTemplate);
			}

			case "delete":
				if (!id) {
					return NextResponse.json(
						{ error: "Template ID is required" },
						{ status: 400 },
					);
				}
				await deleteTemplate(Number(id));
				return NextResponse.json(
					{ message: "Template deleted successfully" },
					{ status: 200 },
				);

			default:
				return NextResponse.json(
					{ error: "Invalid action" },
					{ status: 400 },
				);
		}
	} catch (error) {
		console.error("Error processing template request:", error);
		return NextResponse.json(
			{ error: "Failed to process request" },
			{ status: 500 },
		);
	}
}
