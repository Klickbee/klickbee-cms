import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import {
	createCollectionItem,
	deleteCollectionItem,
	getCollectionBySlug,
	getCollectionItems,
	updateCollectionItem,
} from "../lib/collections";

export async function GET(req: NextRequest) {
	// Authentication check
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	const { searchParams } = new URL(req.url);
	const collectionId = searchParams.get("collectionId");
	const collectionSlug = searchParams.get("collectionSlug");

	try {
		if (collectionId) {
			const items = await getCollectionItems(Number(collectionId));
			return NextResponse.json(items);
		} else if (collectionSlug) {
			// Get collection by slug first, then get its items
			const collection = await getCollectionBySlug(collectionSlug);
			if (!collection) {
				return NextResponse.json(
					{ error: "Collection not found" },
					{ status: 404 },
				);
			}
			const items = await getCollectionItems(collection.id);
			return NextResponse.json(items);
		} else {
			return NextResponse.json(
				{ error: "Collection ID or slug is required" },
				{ status: 400 },
			);
		}
	} catch (error) {
		console.error("Error fetching collection items:", error);
		return NextResponse.json(
			{ error: "Failed to fetch collection items" },
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
		const { action, id, ...data } = body;

		switch (action) {
			case "create": {
				if (!data.title || !data.slug || !data.collectionId) {
					return NextResponse.json(
						{ error: "Title, slug, and collectionId are required" },
						{ status: 400 },
					);
				}
				const newItem = await createCollectionItem(data);
				return NextResponse.json(newItem, { status: 201 });
			}

			case "update": {
				if (!id) {
					return NextResponse.json(
						{ error: "Item ID is required" },
						{ status: 400 },
					);
				}
				const updatedItem = await updateCollectionItem(
					Number(id),
					data,
				);
				return NextResponse.json(updatedItem);
			}

			case "delete":
				if (!id) {
					return NextResponse.json(
						{ error: "Item ID is required" },
						{ status: 400 },
					);
				}
				await deleteCollectionItem(Number(id));
				return NextResponse.json(
					{ message: "Collection item deleted successfully" },
					{ status: 200 },
				);

			default:
				return NextResponse.json(
					{ error: "Invalid action" },
					{ status: 400 },
				);
		}
	} catch (error) {
		console.error("Error processing collection item request:", error);
		return NextResponse.json(
			{ error: "Failed to process request" },
			{ status: 500 },
		);
	}
}
