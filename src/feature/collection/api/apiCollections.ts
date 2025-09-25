import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import {
	createCollection,
	deleteCollection,
	getAllCollections,
	getCollectionById,
	getCollectionBySlug,
	updateCollection,
} from "../lib/collections";

export async function GET(req: NextRequest) {
	// Authentication check
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	const slug = searchParams.get("slug");

	try {
		if (id) {
			const collection = await getCollectionById(Number(id));
			if (!collection) {
				return NextResponse.json(
					{ error: "Collection not found" },
					{ status: 404 },
				);
			}
			return NextResponse.json(collection);
		} else if (slug) {
			const collection = await getCollectionBySlug(slug);
			if (!collection) {
				return NextResponse.json(
					{ error: "Collection not found" },
					{ status: 404 },
				);
			}
			return NextResponse.json(collection);
		} else {
			const collections = await getAllCollections();
			return NextResponse.json(collections);
		}
	} catch (error) {
		console.error("Error fetching collections:", error);
		return NextResponse.json(
			{ error: "Failed to fetch collections" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	// Authentication check
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	try {
		const body = await req.json();
		const { action, id, slug, ...data } = body;

		switch (action) {
			case "create": {
				if (!data.name || !data.slug) {
					return NextResponse.json(
						{ error: "Name and slug are required" },
						{ status: 400 },
					);
				}
				const newCollection = await createCollection(data);
				return NextResponse.json(newCollection, { status: 201 });
			}

			case "update": {
				if (!id) {
					return NextResponse.json(
						{ error: "Collection ID is required" },
						{ status: 400 },
					);
				}
				const updatedCollection = await updateCollection(slug, data);
				return NextResponse.json(updatedCollection);
			}

			case "delete":
				if (!id) {
					return NextResponse.json(
						{ error: "Collection ID is required" },
						{ status: 400 },
					);
				}
				await deleteCollection(Number(id));
				return NextResponse.json(
					{ message: "Collection deleted successfully" },
					{ status: 200 },
				);

			default:
				return NextResponse.json(
					{ error: "Invalid action" },
					{ status: 400 },
				);
		}
	} catch (error) {
		console.error("Error processing collection request:", error);
		return NextResponse.json(
			{ error: "Failed to process request" },
			{ status: 500 },
		);
	}
}
