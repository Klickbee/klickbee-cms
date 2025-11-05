import { ComponentName } from "@/feature/builder/types/components/componentMap";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";
import {
	BreakpointStyleProps,
	ComponentStyleProps,
} from "@/feature/builder/types/components/properties/componentStylePropsType";

export type ComponentType =
	// Layout components
	| "section"
	| "container"
	| "grid"
	// Text & Content components
	| "heading"
	| "text"
	| "paragraph"
	| "textarea"
	| "richtext"
	| "link"
	| "spacer"
	| "divider"
	// Media components
	| "image"
	| "video"
	| "embed"
	| "fileupload"
	| "slider"
	// Form components
	| "input"
	| "email"
	| "button"
	| "formblock"
	| "textfield"
	| "list"
	| "checkbox"
	| "radiogroup"
	| "dropdown"
	| "submitbutton"
	// Navigation components
	| "navigationmenu"
	// CMS components
	| "cmstemplate"
	| "undefined";

export interface BuilderComponent {
	id: string;
	type: ComponentType;
	name: ComponentName;
	label: string;
	groupId: string;
	order?: number; // Order-based positioning
	children?: BuilderComponent[];
	props: {
		// During migration, allow both legacy flat style and breakpoint map
		style?: BreakpointStyleProps | ComponentStyleProps;
		content?: ComponentContentProps;
	};
	icon?: React.ReactNode; // Optional icon for display
}

export interface ParentBuilderComponent extends BuilderComponent {
	children: BuilderComponent[];
}

// Define which components can have children
export const CONTAINER_COMPONENTS: ComponentType[] = [
	"section",
	"container",
	"grid",
	"formblock",
];

// Helper function to check if a component can have children
export function canHaveChildren(type: ComponentType): boolean {
	return CONTAINER_COMPONENTS.includes(type);
}

export function isParentComponent(
	component: BuilderComponent,
): component is ParentBuilderComponent {
	return canHaveChildren(component.type);
}
