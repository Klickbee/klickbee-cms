export type MediaFile = {
	filename: string;
	url: string;
	type: string;
	category: "image" | "video" | "document";
	size: number;
	createdAt: string;
	modifiedAt: string;
	width?: number;
	height?: number;
};

export type MediaUploadResponse = {
	url: string;
	fileName: string;
	size: number;
	type: string;
};

export type MediaListResponse = {
	files: MediaFile[];
};

export type MediaDeleteResponse = {
	message: string;
};
