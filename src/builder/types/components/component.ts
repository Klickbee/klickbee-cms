export type ComponentType =
	// Layout components
	| "section"
	| "container"
	| "grid"
	| "spacer"
	| "divider"
	// Text components
	| "heading"
	| "text"
	// Media components
	| "image"
	| "video"
	// Form components
	| "input"
	| "email";

export interface BaseComponent {
	id: string;
	type: ComponentType;
	label: string;
	groupId: string;
	position?: {
		x: number;
		y: number;
	};
	children?: BuilderComponent[];
	props?: Record<string, unknown>;
	icon?: React.ReactNode;
}

export type BuilderComponent = BaseComponent;

// Define which components can have children
export const CONTAINER_COMPONENTS: ComponentType[] = [
	"section",
	"container",
	"grid",
];

// Helper function to check if a component can have children
export function canHaveChildren(type: ComponentType): boolean {
	return CONTAINER_COMPONENTS.includes(type);
}
