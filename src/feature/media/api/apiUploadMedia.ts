import { existsSync } from "fs";
import { mkdir, unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import {
	createMedia,
	deleteMedia,
	getAllMedias,
	getMediaById,
	updateMedia,
} from "@/feature/media/lib/media";
import { mediaUpdateSchema } from "@/feature/media/schemas/mediaUpdateSchema";
import { getCurrentUser } from "@/feature/user/options/userServerOptions";

export async function POST(request: Request) {
	const formData = await request.formData();
	const file = formData.get("media") as File | null;

	if (!file) {
		return NextResponse.json(
			{ error: "Aucun fichier envoyé" },
			{ status: 400 },
		);
	}

	// Supported file types
	const supportedTypes = [
		"image/png",
		"image/jpeg",
		"image/jpg",
		"image/gif",
		"image/webp",
		"image/svg+xml",
		"video/mp4",
		"video/webm",
		"application/pdf",
	];

	if (!supportedTypes.includes(file.type)) {
		return NextResponse.json(
			{ error: "Type de fichier non supporté" },
			{ status: 415 },
		);
	}

	// 50MB limit
	const maxSize = 50 * 1024 * 1024;
	if (file.size > maxSize) {
		return NextResponse.json(
			{ error: "Le fichier est trop volumineux (limite: 50MB)" },
			{ status: 413 },
		);
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	// Create directory structure
	const uploadDir = join(process.cwd(), "public", "uploads", "media");
	if (!existsSync(uploadDir)) {
		await mkdir(uploadDir, { recursive: true });
	}

	const filePath = join(uploadDir, file.name);
	const fileName = file.name;
	const category = file.type.startsWith("image/")
		? "IMAGE"
		: file.type.startsWith("video/")
			? "VIDEO"
			: "DOCUMENT";
	const url = `/uploads/media/${file.name}`;

	try {
		await writeFile(filePath, buffer);
		const currentUser = await getCurrentUser();

		const newMedia = await createMedia({
			altText: null,
			caption: null,
			category,
			createdAt: new Date(),
			description: null,
			fileName,
			updatedAt: new Date(),
			url,
			userId: currentUser?.id || "0",
		});
		return NextResponse.json(newMedia, {
			headers: { "Content-Type": "application/json" },
			status: 200,
		});
	} catch (error) {
		console.error("Error saving file:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la sauvegarde du fichier" },
			{ status: 500 },
		);
	}
}

export async function GET() {
	const uploadDir = join(process.cwd(), "public", "uploads", "media");

	if (!existsSync(uploadDir)) {
		return NextResponse.json({ files: [] });
	}

	try {
		const mediaFiles = await getAllMedias();

		return NextResponse.json({ files: mediaFiles });
	} catch (error) {
		console.error("Error reading media directory:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la lecture des fichiers" },
			{ status: 500 },
		);
	}
}

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const { id, ...data } = body;

		if (!id) {
			return NextResponse.json(
				{ error: "ID du média requis" },
				{ status: 400 },
			);
		}

		// Validate the data
		const validatedData = mediaUpdateSchema.parse(data);

		// Update media in database
		const updatedMedia = await updateMedia(id, validatedData);

		return NextResponse.json(updatedMedia, {
			headers: { "Content-Type": "application/json" },
			status: 200,
		});
	} catch (error) {
		console.error("Error updating media:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la mise à jour du média" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const idParam = searchParams.get("id");

	if (!idParam) {
		return NextResponse.json(
			{ error: "ID du média requis" },
			{ status: 400 },
		);
	}

	const id = parseInt(idParam, 10);
	if (isNaN(id)) {
		return NextResponse.json(
			{ error: "ID du média invalide" },
			{ status: 400 },
		);
	}

	try {
		// Get media info from database
		const media = await getMediaById(id);
		if (!media) {
			return NextResponse.json(
				{ error: "Média non trouvé" },
				{ status: 404 },
			);
		}

		// Extract filename from URL
		const filename = media.url.split("/").pop();
		if (!filename) {
			return NextResponse.json(
				{ error: "Nom de fichier invalide" },
				{ status: 400 },
			);
		}

		const filePath = join(
			process.cwd(),
			"public",
			"uploads",
			"media",
			filename,
		);

		// Delete from database first
		await deleteMedia(id);

		// Delete physical file if it exists
		if (existsSync(filePath)) {
			await unlink(filePath);
		}

		return NextResponse.json(
			{ message: "Média supprimé avec succès" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error deleting media:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la suppression du média" },
			{ status: 500 },
		);
	}
}
