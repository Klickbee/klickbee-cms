import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

/**
 * Component categories for organizing components by their purpose
 */
/* eslint-disable no-unused-vars */
export enum ComponentCategory {
	LAYOUT = "Layout",
	TYPOGRAPHY = "Typography",
	MEDIA = "Media",
	INTERACTIVE = "Interactive",
	FORM = "Form",
	FORM_ELEMENTS = "Form Elements",
}

/**
 * Union type of all available component names for type safety
 */
export type ComponentName =
	// Layout components
	| "Section"
	| "Container"
	| "Grid"
	| "Spacer"
	| "Divider"
	// Typography components
	| "Heading"
	| "Paragraph"
	| "RichText"
	| "List"
	| "Link"
	// Interactive components
	| "Button"
	// Media components
	| "Image"
	| "Video"
	| "Embed"
	// Form components
	| "FormBlock"
	| "TextField"
	| "TextArea"
	| "Checkbox"
	| "RadioGroup"
	| "Dropdown"
	| "FileUpload"
	| "SubmitButton";

/**
 * Base interface for all component entries in the component map
 */
export interface ComponentMapEntry {
	/** Category this component belongs to */
	category: ComponentCategory;
	/** Content properties specific to this component */
	contentProps: Partial<ComponentContentProps>;
	/** Style properties applicable to this component */
	styleProps: Partial<ComponentStyleProps>;
	/** Optional description of the component's purpose */
	description?: string;
}

/**
 * Helper function to create a layout component entry with common style properties
 */
const createLayoutComponent = (
	description: string,
	additionalContentProps: Partial<ComponentContentProps> = {},
	additionalStyleProps: Partial<ComponentStyleProps> = {},
): ComponentMapEntry => ({
	category: ComponentCategory.LAYOUT,
	contentProps: {
		...additionalContentProps,
	},
	description,
	styleProps: {
		background: {},
		bordersAndCorners: {},
		effects: {},
		layout: {},
		sizeAndSpacing: {},
		...additionalStyleProps,
	},
});

/**
 * Helper function to create a typography component entry with common style properties
 */
const createTypographyComponent = (
	description: string,
	contentProps: Partial<ComponentContentProps>,
	additionalStyleProps: Partial<ComponentStyleProps> = {},
): ComponentMapEntry => ({
	category: ComponentCategory.TYPOGRAPHY,
	contentProps,
	description,
	styleProps: {
		effects: {},
		sizeAndSpacing: {},
		typography: {},
		...additionalStyleProps,
	},
});

/**
 * Helper function to create a form element component entry with common style properties
 */
const createFormElementComponent = (
	description: string,
	contentProps: Partial<ComponentContentProps>,
	additionalStyleProps: Partial<ComponentStyleProps> = {},
): ComponentMapEntry => ({
	category: ComponentCategory.FORM_ELEMENTS,
	contentProps,
	description,
	styleProps: {
		background: {},
		bordersAndCorners: {},
		effects: {},
		sizeAndSpacing: {},
		typography: {},
		...additionalStyleProps,
	},
});

/**
 * Component map containing all available components with their properties
 * Organized by component type for better maintainability
 */
export const componentMap: Record<ComponentName, ComponentMapEntry> = {
	// ===== INTERACTIVE COMPONENTS =====
	Button: {
		category: ComponentCategory.INTERACTIVE,
		contentProps: { href: "", icon: "", text: "" },
		description:
			"A clickable button that can trigger an action or navigation",
		styleProps: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			sizeAndSpacing: {},
			typography: {},
		},
	},

	Checkbox: createFormElementComponent(
		"A checkbox input with a label",
		{ defaultChecked: false, label: "" },
		{ layout: {} },
	),

	Container: createLayoutComponent(
		"A general-purpose container for grouping related elements",
	),

	Divider: {
		category: ComponentCategory.LAYOUT,
		contentProps: {},
		description: "A horizontal or vertical line that separates content",
		styleProps: {
			bordersAndCorners: {},
			effects: {},
			sizeAndSpacing: {},
		},
	},

	Dropdown: createFormElementComponent(
		"A dropdown select menu with options",
		{ defaultText: "", name: "", options: [] },
	),

	Embed: {
		category: ComponentCategory.MEDIA,
		contentProps: { code: "" },
		description: "An embedded iframe or custom HTML code",
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
		},
	},

	FileUpload: createFormElementComponent(
		"A file upload input with configurable file types and size limits",
		{ maxFileSize: 0, mimeTypes: "", name: "" },
	),

	// ===== FORM COMPONENTS =====
	FormBlock: {
		category: ComponentCategory.FORM,
		contentProps: { errorMessage: "", successMessage: "" },
		description:
			"A container for form elements with success/error messages",
		styleProps: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
		},
	},

	Grid: createLayoutComponent(
		"A container that arranges child elements in a grid layout",
	),

	// ===== TYPOGRAPHY COMPONENTS =====
	Heading: createTypographyComponent(
		"A heading element (H1-H6) for titles and subtitles",
		{ level: 1, text: "" },
	),

	// ===== MEDIA COMPONENTS =====
	Image: {
		category: ComponentCategory.MEDIA,
		contentProps: { alt: "", src: "" },
		description: "An image element with alt text for accessibility",
		styleProps: {
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
		},
	},

	Link: {
		category: ComponentCategory.TYPOGRAPHY,
		contentProps: { href: "", openInNewTab: false, text: "" },
		description: "A text link to another page or resource",
		styleProps: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			typography: {},
		},
	},

	List: createTypographyComponent(
		"A bulleted or numbered list of items",
		{ items: [], listType: "bulleted" },
		{
			background: {},
			bordersAndCorners: {},
		},
	),

	Paragraph: createTypographyComponent("A paragraph of text", { text: "" }),

	RadioGroup: createFormElementComponent(
		"A group of radio button options",
		{ options: [], question: "" },
		{ layout: {} },
	),

	RichText: createTypographyComponent(
		"Formatted text with rich styling options",
		{ content: "" },
		{
			background: {},
			bordersAndCorners: {},
		},
	),
	// ===== LAYOUT COMPONENTS =====
	Section: createLayoutComponent(
		"A top-level container for organizing content sections",
	),

	Spacer: {
		category: ComponentCategory.LAYOUT,
		contentProps: {},
		description: "Creates vertical or horizontal space between elements",
		styleProps: {
			sizeAndSpacing: {},
		},
	},

	SubmitButton: createFormElementComponent("A submit button for forms", {
		text: "",
	}),

	TextArea: createFormElementComponent("A multi-line text input field", {
		name: "",
		placeholder: "",
		required: false,
	}),

	// ===== FORM ELEMENT COMPONENTS =====
	TextField: createFormElementComponent("A single-line text input field", {
		name: "",
		placeholder: "",
		required: false,
		type: "text",
	}),

	Video: {
		category: ComponentCategory.MEDIA,
		contentProps: { autoplay: false, controls: false, src: "" },
		description: "A video player with configurable controls",
		styleProps: {
			bordersAndCorners: {},
			effects: {},
			layout: {},
			sizeAndSpacing: {},
		},
	},
};

/**
 * Get all components belonging to a specific category
 * @param category The category to filter by
 * @returns An array of component names in the specified category
 */
export const getComponentsByCategory = (
	category: ComponentCategory,
): ComponentName[] => {
	return (
		Object.entries(componentMap)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([_, component]) => component.category === category)
			.map(([name]) => name as ComponentName)
	);
};

/**
 * Get all available component categories
 * @returns An array of all component categories that have at least one component
 */
export const getAvailableCategories = (): ComponentCategory[] => {
	const categories = new Set<ComponentCategory>();

	Object.values(componentMap).forEach((component) => {
		categories.add(component.category);
	});

	return Array.from(categories);
};
