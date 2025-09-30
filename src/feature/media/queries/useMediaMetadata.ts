"use client";

import { useQuery } from "@tanstack/react-query";
import type { MediaMetadata } from "../lib/mediaMetadata";

/**
 * Fetches media metadata from the API
 */
async function fetchMediaMetadata(
	fileName: string,
	fileUrl: string,
): Promise<MediaMetadata> {
	const params = new URLSearchParams({
		fileName,
		fileUrl,
	});

	const response = await fetch(`/api/admin/media/metadata?${params}`);

	if (!response.ok) {
		throw new Error("Failed to fetch media metadata");
	}

	return response.json();
}

/**
 * React Query hook for fetching media metadata
 */
export function useMediaMetadata(
	fileName: string,
	fileUrl: string,
	enabled = true,
) {
	return useQuery({
		enabled: enabled && Boolean(fileName && fileUrl),
		queryFn: () => fetchMediaMetadata(fileName, fileUrl),
		queryKey: ["mediaMetadata", fileName, fileUrl],
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
