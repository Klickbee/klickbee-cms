import { existsSync } from "fs";
import { mkdir, readdir, readFile, stat, unlink, writeFile } from "fs/promises";
import sizeOf from "image-size";
import { NextResponse } from "next/server";
import { join } from "path";

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

	// 10MB limit
	const maxSize = 10 * 1024 * 1024;
	if (file.size > maxSize) {
		return NextResponse.json(
			{ error: "Le fichier est trop volumineux (limite: 10MB)" },
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

	try {
		await writeFile(filePath, buffer);

		const url = `/uploads/media/${file.name}`;
		return NextResponse.json(
			{ fileName: file.name, size: file.size, type: file.type, url },
			{
				headers: { "Content-Type": "application/json" },
				status: 200,
			},
		);
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
		const files = await readdir(uploadDir);
		const mediaFiles = await Promise.all(
			files.map(async (filename) => {
				const filePath = join(uploadDir, filename);
				let dimensions;
				const stats = await stat(filePath);
				const url = `/uploads/media/${filename}`;

				// Get file extension and mime type
				const extension = filename.split(".").pop()?.toLowerCase();
				let type = "application/octet-stream";
				let category = "document";

				if (
					["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
						extension || "",
					)
				) {
					type = `image/${extension === "jpg" ? "jpeg" : extension}`;
					category = "image";
					const buffer = await readFile(filePath);
					dimensions = sizeOf(buffer);
				} else if (["mp4", "webm"].includes(extension || "")) {
					type = `video/${extension}`;
					category = "video";
				} else if (["pdf"].includes(extension || "")) {
					type = "application/pdf";
					category = "document";
				}

				return {
					category,
					createdAt: stats.birthtime,
					filename,
					height: dimensions?.height,
					modifiedAt: stats.mtime,
					size: stats.size,
					type,
					url,
					width: dimensions?.width,
				};
			}),
		);

		// Sort by creation date, newest first
		mediaFiles.sort(
			(a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
		);

		return NextResponse.json({ files: mediaFiles });
	} catch (error) {
		console.error("Error reading media directory:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la lecture des fichiers" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");

	if (!filename) {
		return NextResponse.json(
			{ error: "Nom de fichier requis" },
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

	if (!existsSync(filePath)) {
		return NextResponse.json(
			{ error: "Fichier non trouvé" },
			{ status: 404 },
		);
	}

	try {
		await unlink(filePath);
		return NextResponse.json(
			{ message: "Fichier supprimé avec succès" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error deleting file:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la suppression du fichier" },
			{ status: 500 },
		);
	}
}
