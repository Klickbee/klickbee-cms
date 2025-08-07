import {
	Box,
	CheckSquare,
	CircleCheck,
	Code as Embed,
	FileText,
	FileUp,
	FormInput,
	GalleryVertical,
	Heading,
	Image,
	FormInputIcon as InputIcon,
	LayoutGrid,
	Link as LinkIcon,
	ListIcon,
	Mail,
	Minus,
	MoveVertical,
	RectangleHorizontal as Rectangle,
	Send,
	Text,
	Type,
	Upload,
	Video,
} from "lucide-react";
import { ComponentType } from "@/builder/types/components/component";

export type ComponentItem = {
	id: string;
	label: string;
	icon: React.ReactNode;
	group: string;
	children?: ComponentItem[];
	type: ComponentType;
};

export const componentsList: ComponentItem[] = [
	// Layout components
	{
		group: "layout",
		icon: <GalleryVertical size={16} />,
		id: "section",
		label: "Section",
		type: "section",
	},
	{
		group: "layout",
		icon: <Box size={16} />,
		id: "container",
		label: "Container",
		type: "container",
	},
	{
		group: "layout",
		icon: <LayoutGrid size={16} />,
		id: "grid",
		label: "Grid/Column",
		type: "grid",
	},

	// Text & Content components
	{
		group: "text",
		icon: <Heading size={16} />,
		id: "heading",
		label: "Heading",
		type: "heading",
	},
	{
		group: "text",
		icon: <Text size={16} />,
		id: "text",
		label: "Text",
		type: "text",
	},
	{
		group: "text",
		icon: <Type size={16} />,
		id: "paragraph",
		label: "Paragraph",
		type: "paragraph",
	},
	{
		group: "text",
		icon: <FileText size={16} />,
		id: "richtext",
		label: "Rich Text",
		type: "richtext",
	},
	{
		group: "text",
		icon: <LinkIcon size={16} />,
		id: "link",
		label: "Link",
		type: "link",
	},
	{
		group: "text",
		icon: <Rectangle size={16} />,
		id: "button",
		label: "Button",
		type: "button",
	},
	{
		group: "text",
		icon: <MoveVertical size={16} />,
		id: "spacer",
		label: "Spacer",
		type: "spacer",
	},
	{
		group: "text",
		icon: <Minus size={16} />,
		id: "divider",
		label: "Divider",
		type: "divider",
	},

	// Media components
	{
		group: "media",
		icon: <Image size={16} />,
		id: "image",
		label: "Image",
		type: "image",
	},
	{
		group: "media",
		icon: <Video size={16} />,
		id: "video",
		label: "Video",
		type: "video",
	},
	{
		group: "media",
		icon: <Embed size={16} />,
		id: "embed",
		label: "Embed",
		type: "embed",
	},
	{
		group: "media",
		icon: <Upload size={16} />,
		id: "fileupload",
		label: "File Upload",
		type: "fileupload",
	},

	// Form components

	{
		group: "form",
		icon: <FileText size={16} />,
		id: "formrichtext",
		label: "Rich Text",
		type: "richtext",
	},
	{
		group: "form",
		icon: <Box size={16} />,
		id: "formblock",
		label: "Form Block",
		type: "formblock",
	},
	{
		group: "form",
		icon: <FormInput size={16} />,
		id: "textfield",
		label: "Text Field",
		type: "textfield",
	},
	{
		group: "form",
		icon: <ListIcon size={16} />,
		id: "list",
		label: "List",
		type: "list",
	},
	{
		group: "form",
		icon: <CheckSquare size={16} />,
		id: "checkbox",
		label: "Checkbox",
		type: "checkbox",
	},
	{
		group: "form",
		icon: <CircleCheck size={16} />,
		id: "radiogroup",
		label: "Radio Group",
		type: "radiogroup",
	},
	{
		group: "form",
		icon: <Box size={16} />,
		id: "dropdown",
		label: "Dropdown",
		type: "dropdown",
	},
	{
		group: "form",
		icon: <FileUp size={16} />,
		id: "formfileupload",
		label: "File Upload",
		type: "fileupload",
	},
	{
		group: "form",
		icon: <Send size={16} />,
		id: "submitbutton",
		label: "Submit Button",
		type: "submitbutton",
	},
	{
		group: "form",
		icon: <InputIcon size={16} />,
		id: "input",
		label: "Input",
		type: "input",
	},
	{
		group: "form",
		icon: <Mail size={16} />,
		id: "email",
		label: "Email",
		type: "email",
	},
];
