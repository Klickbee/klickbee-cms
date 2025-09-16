import type {
	MediaDeleteResponse,
	MediaFile,
	MediaUploadResponse,
} from "../types/media";

export const uploadMedia = async (file: File): Promise<MediaUploadResponse> => {
	const formData = new FormData();
	formData.append("media", file);

	const response = await fetch("/api/admin/media", {
		body: formData,
		method: "POST",
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to upload media");
	}

	return response.json();
};

export const deleteMedia = async (
	filename: string,
): Promise<MediaDeleteResponse> => {
	const response = await fetch(
		`/api/admin/media?filename=${encodeURIComponent(filename)}`,
		{
			method: "DELETE",
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to delete media");
	}

	return response.json();
};

export const getAllMedia = async (): Promise<MediaFile[]> => {
	const response = await fetch("/api/admin/media");

	if (!response.ok) {
		throw new Error("Failed to fetch media files");
	}

	const data = await response.json();
	return data.files || [];
};
