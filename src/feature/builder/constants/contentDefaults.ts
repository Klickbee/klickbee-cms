import { ComponentType } from "@/feature/builder/types/components/components";
import {
	ComponentContentProps,
	HeadingLevel,
	ListType,
} from "@/feature/builder/types/components/properties/componentContentPropsType";

/**
 * Constantes centralisées pour éliminer les 30+ occurrences de strings hardcodées
 * dans les composants de contenu du builder
 */
export const CONTENT_DEFAULTS = {
	// Text content - Pattern répétitif dans les composants texte
	BUTTON_TEXT: "Button Text Here",

	// Media - Pattern répétitif dans composants média
	DEFAULT_ALT_TEXT: "Loremipsum dolor sit amet",
	DEFAULT_AUTOPLAY: true,
	DEFAULT_CONTROLS: true,
	DEFAULT_CUSTOM_CODE: "Custom code",
	DEFAULT_ENABLE_DYNAMIC: true,
	DEFAULT_ERROR_MESSAGE: "Error Message Here",

	// Heading levels
	DEFAULT_HEADING_LEVEL: 1 as HeadingLevel,

	// Lists & Items - Pattern répétitif dans 3 composants (RadioGroup, Dropdown, List)
	DEFAULT_LIST_ITEMS: ["List Radio 1", "List Radio 2", "List Radio 3"],
	DEFAULT_LIST_TYPE: "bulleted" as ListType,

	// Files - Pattern répétitif dans FileUpload
	DEFAULT_MAX_FILE_SIZE: 2,
	DEFAULT_MIME_TYPE: "PDF",
	DEFAULT_OPEN_NEW_TAB: true,

	// Rich content
	DEFAULT_RICH_CONTENT: "",

	// Forms - Pattern répétitif dans FormBlock
	DEFAULT_SUCCESS_MESSAGE: "Success Message Here",

	// CMS Templates - Pattern répétitif dans CMSTemplate
	DEFAULT_TEMPLATE_FIELD: "Heading",

	// TextArea
	DEFAULT_TEXTAREA_ROWS: 1,

	// URLs & Links - Pattern répétitif dans 4 composants
	DEFAULT_URL: "https://www.google.com/",
	FIELD_LABEL: "Label Name Here",
	// Form fields - Pattern répétitif dans 8 composants
	FIELD_NAME: "Field Name Here",
	FIELD_REQUIRED: true,
	HEADING_TEXT: "Text Heading",
	LINK_TEXT: "Link Text Here",
	PARAGRAPH_TEXT: "Text",
};

/**
 * Configuration par type de composant pour une initialisation cohérente
 * Utilise les constantes centralisées pour éviter la duplication
 */
export const COMPONENT_DEFAULTS: Record<
	ComponentType,
	Partial<ComponentContentProps>
> = {
	button: {
		href: CONTENT_DEFAULTS.DEFAULT_URL,
		text: CONTENT_DEFAULTS.BUTTON_TEXT,
	},
	checkbox: {
		defaultChecked: true,
		label: CONTENT_DEFAULTS.FIELD_LABEL,
		name: CONTENT_DEFAULTS.FIELD_NAME,
		required: CONTENT_DEFAULTS.FIELD_REQUIRED,
	},
	cmstemplate: {
		templateFieldName: CONTENT_DEFAULTS.DEFAULT_TEMPLATE_FIELD,
	},
	container: {},
	divider: {
		orientation: "horizontal",
		size: "md",
	},
	dropdown: {
		items: CONTENT_DEFAULTS.DEFAULT_LIST_ITEMS,
		label: CONTENT_DEFAULTS.FIELD_LABEL,
		name: CONTENT_DEFAULTS.FIELD_NAME,
		required: CONTENT_DEFAULTS.FIELD_REQUIRED,
	},
	email: {
		name: CONTENT_DEFAULTS.FIELD_NAME,
		placeholder: CONTENT_DEFAULTS.FIELD_LABEL,
	},
	embed: {
		code: CONTENT_DEFAULTS.DEFAULT_CUSTOM_CODE,
	},
	fileupload: {
		label: CONTENT_DEFAULTS.FIELD_LABEL,
		maxFileSize: CONTENT_DEFAULTS.DEFAULT_MAX_FILE_SIZE,
		mimeTypes: CONTENT_DEFAULTS.DEFAULT_MIME_TYPE,
		name: CONTENT_DEFAULTS.FIELD_NAME,
		required: CONTENT_DEFAULTS.FIELD_REQUIRED,
	},

	// Form block
	formblock: {
		errorMessage: CONTENT_DEFAULTS.DEFAULT_ERROR_MESSAGE,
		successMessage: CONTENT_DEFAULTS.DEFAULT_SUCCESS_MESSAGE,
	},
	grid: {},

	// Text & Content components
	heading: {
		level: CONTENT_DEFAULTS.DEFAULT_HEADING_LEVEL,
		text: CONTENT_DEFAULTS.HEADING_TEXT,
	},

	// Media components
	image: {
		alt: CONTENT_DEFAULTS.DEFAULT_ALT_TEXT,
		src: "",
	},

	// Autres composants
	input: {
		name: CONTENT_DEFAULTS.FIELD_NAME,
		placeholder: CONTENT_DEFAULTS.FIELD_LABEL,
	},
	link: {
		href: CONTENT_DEFAULTS.DEFAULT_URL,
		openInNewTab: CONTENT_DEFAULTS.DEFAULT_OPEN_NEW_TAB,
		text: CONTENT_DEFAULTS.LINK_TEXT,
	},

	// List components
	list: {
		items: CONTENT_DEFAULTS.DEFAULT_LIST_ITEMS,
		listType: CONTENT_DEFAULTS.DEFAULT_LIST_TYPE,
	},
	paragraph: {
		text: CONTENT_DEFAULTS.PARAGRAPH_TEXT,
	},
	radiogroup: {
		items: CONTENT_DEFAULTS.DEFAULT_LIST_ITEMS,
		label: CONTENT_DEFAULTS.FIELD_LABEL,
		name: CONTENT_DEFAULTS.FIELD_NAME,
		required: CONTENT_DEFAULTS.FIELD_REQUIRED,
	},
	richtext: {
		content: CONTENT_DEFAULTS.DEFAULT_RICH_CONTENT,
	},

	// Layout components (pas de contenu spécifique)
	section: {},
	spacer: {},
	submitbutton: {
		name: CONTENT_DEFAULTS.FIELD_NAME,
		text: CONTENT_DEFAULTS.BUTTON_TEXT,
	},
	text: {
		text: CONTENT_DEFAULTS.PARAGRAPH_TEXT,
	},
	textarea: {
		label: CONTENT_DEFAULTS.FIELD_LABEL,
		name: CONTENT_DEFAULTS.FIELD_NAME,
		required: CONTENT_DEFAULTS.FIELD_REQUIRED,
		rows: CONTENT_DEFAULTS.DEFAULT_TEXTAREA_ROWS,
	},
	// Form components
	textfield: {
		label: CONTENT_DEFAULTS.FIELD_LABEL,
		name: CONTENT_DEFAULTS.FIELD_NAME,
		required: CONTENT_DEFAULTS.FIELD_REQUIRED,
		type: "text",
	},
	slider: {},
	navigationmenu: {},
	undefined: {},
	video: {
		autoplay: CONTENT_DEFAULTS.DEFAULT_AUTOPLAY,
		controls: CONTENT_DEFAULTS.DEFAULT_CONTROLS,
		src: CONTENT_DEFAULTS.DEFAULT_URL,
	},
};
