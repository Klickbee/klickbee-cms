export type ListType = "bulleted" | "numbered";
export type FieldType = "text" | "email" | "password";

export interface ComponentContentProps {
	text?: string; // General text content (buttons, links, labels, etc.)
	content?: string; // Formatted text (rich text blocks)
	level?: 1 | 2 | 3 | 4 | 5 | 6; // Heading level (H1–H6)
	href?: string; // Link or action URL
	openInNewTab?: boolean; // Open link in new tab
	icon?: React.ReactNode | string; // Icon reference
	src?: string; // Media source (image/video)
	alt?: string; // Alternative text for accessibility
	autoplay?: boolean; // Autoplay for video
	controls?: boolean; // Video controls
	code?: string; // Custom embed HTML or iframe
	listType?: ListType; // List type (bulleted or numbered)
	items?: string[]; // Array of text items
	successMessage?: string; // Text after successful form submission
	errorMessage?: string; // Text after failed submission
	name?: string; // Field identifier
	placeholder?: string; // Input placeholder
	required?: boolean; // Required field
	type?: FieldType; // Field type (text, email, password)
	defaultChecked?: boolean; // Default checked for checkbox
	question?: string; // Label for radio group
	options?: string[]; // List of selectable options
	defaultText?: string; // Placeholder option for dropdown
	mimeTypes?: string[]; // Array of mime types (e.g., ["image/png", "image/jpeg"])
	maxFileSize?: number; // Numeric size limit (MB)
	label?: string; // Label for the input
}
