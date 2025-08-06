import {
	Box,
	GalleryVertical,
	Heading,
	Image,
	FormInputIcon as InputIcon,
	LayoutGrid,
	Mail,
	Minus,
	MoveVertical,
	Text,
	Video,
} from "lucide-react";
import { BuilderComponent } from "@/builder/types/components/component";

export type ComponentItem = {
	id: string;
	label: string;
	icon: React.ReactNode;
	group: string;
	children?: ComponentItem[];
};

export const componentsList: ComponentItem[] = [
	{
		group: "layout",
		icon: <GalleryVertical size={16} />,
		id: "section",
		label: "Section",
	},
	{
		group: "layout",
		icon: <Box size={16} />,
		id: "container",
		label: "Container",
	},
	{
		group: "layout",
		icon: <LayoutGrid size={16} />,
		id: "grid",
		label: "Grid/Column",
	},
	{
		group: "layout",
		icon: <MoveVertical size={16} />,
		id: "spacer",
		label: "Spacer",
	},
	{
		group: "layout",
		icon: <Minus size={16} />,
		id: "divider",
		label: "Divider",
	},
	{
		group: "text",
		icon: <Heading size={16} />,
		id: "heading",
		label: "Heading",
	},
	{ group: "text", icon: <Text size={16} />, id: "text", label: "Text" },
	{ group: "media", icon: <Image size={16} />, id: "image", label: "Image" },
	{ group: "media", icon: <Video size={16} />, id: "video", label: "Video" },
	{
		group: "form",
		icon: <InputIcon size={16} />,
		id: "input",
		label: "Input",
	},
	{ group: "form", icon: <Mail size={16} />, id: "email", label: "Email" },
];

export const componentList = componentsList.map((c) => ({
	group: c.group,
	id: c.id,
	label: c.label,
}));
