import { ChevronRight } from "lucide-react";

interface GooglePreviewData {
	slug?: string;
	metaTitle?: string | null;
	metaDescription?: string | null;
	title?: string;
}

interface GooglePreviewFormValues {
	slug?: string;
	metaTitle?: string;
	metaDescription?: string;
}

interface GooglePreviewProps {
	page?: GooglePreviewData;
	baseUrl?: string;
	formValues?: GooglePreviewFormValues;
}

export default function GoogleSearchPreview({
	page,
	baseUrl,
	formValues,
}: GooglePreviewProps) {
	// Use form values if available, otherwise fallback to page data
	const currentSlug = formValues?.slug || page?.slug || "";
	const currentMetaTitle = formValues?.metaTitle || page?.metaTitle || "";
	const currentMetaDescription =
		formValues?.metaDescription || page?.metaDescription || "";

	// Use metaTitle if available, otherwise fallback to page title
	const displayTitle = currentMetaTitle || page?.title || "Page sans titre";
	// Use metaDescription if available, otherwise generate a default description
	const description =
		currentMetaDescription ||
		`Découvrez ${page?.title || "cette page"} sur notre site web.`;
	// Limit description to ~160 characters like Google
	const truncatedDescription =
		description.length > 160
			? description.substring(0, 157) + "..."
			: description;

	return (
		<div className="rounded-lg p-4 bg-muted w-full">
			<div className="flex items-center gap-0 mb-3">
				{baseUrl} <ChevronRight className="w-4 h-4 text-gray-500" />
				<span className="text-gray-500 text-xs">{currentSlug}</span>
			</div>
			<span className="text-xl text-blue-800 mb-2">{displayTitle}</span>
			<p className="text-sm text-gray-900">{truncatedDescription}</p>
		</div>
	);
}
