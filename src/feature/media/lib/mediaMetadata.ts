"use server";

import { existsSync, readFileSync, statSync } from "fs";
import sizeOf from "image-size";
import { join } from "path";

export type MediaMetadata = {
	size: number;
	type: string;
	width?: number;
	height?: number;
};

/**
 * Extract file metadata from a media file
 * @param fileName - The file name
 * @param url - The file URL (for fallback MIME type detection)
 * @returns Promise<MediaMetadata>
 */
export async function extractFileMetadata(
	fileName: string,
	url: string,
): Promise<MediaMetadata> {
	// Construct the full file path
	const filePath = join(process.cwd(), "public", url);

	if (!existsSync(filePath)) {
		throw new Error(`File not found: ${filePath}`);
	}

	// Get file stats for size
	const stats = statSync(filePath);
	const size = stats.size;

	// Determine MIME type from file extension
	const extension = fileName.split(".").pop()?.toLowerCase();
	let type = "application/octet-stream"; // Default type

	switch (extension) {
		case "png":
			type = "image/png";
			break;
		case "jpg":
		case "jpeg":
			type = "image/jpeg";
			break;
		case "gif":
			type = "image/gif";
			break;
		case "webp":
			type = "image/webp";
			break;
		case "svg":
			type = "image/svg+xml";
			break;
		case "mp4":
			type = "video/mp4";
			break;
		case "webm":
			type = "video/webm";
			break;
		case "pdf":
			type = "application/pdf";
			break;
		default:
			// Try to detect from file content or use default
			break;
	}

	let width: number | undefined;
	let height: number | undefined;

	// Get image dimensions if it's an image
	if (type.startsWith("image/")) {
		try {
			const buffer = readFileSync(filePath);
			const dimensions = sizeOf(buffer);
			width = dimensions.width;
			height = dimensions.height;
		} catch (error) {
			console.warn("Could not extract image dimensions:", error);
		}
	}

	return {
		height,
		size,
		type,
		width,
	};
}
