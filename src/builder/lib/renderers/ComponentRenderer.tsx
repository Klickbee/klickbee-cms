import React from "react";
import { Button } from "@/builder/components/ui/Button";
import { Checkbox } from "@/builder/components/ui/Checkbox";
import { Container } from "@/builder/components/ui/Container";
import { Dropdown } from "@/builder/components/ui/Dropdown";
import { Embed } from "@/builder/components/ui/Embed";
import { FileUpload } from "@/builder/components/ui/FileUpload";
import { FormBlock } from "@/builder/components/ui/FormBlock";
import { Grid } from "@/builder/components/ui/Grid";
import { Heading } from "@/builder/components/ui/Heading";
import { Image } from "@/builder/components/ui/Image";
import { Link } from "@/builder/components/ui/Link";
import { List } from "@/builder/components/ui/List";
import { Paragraph } from "@/builder/components/ui/Paragraph";
import { RadioGroup } from "@/builder/components/ui/RadioGroup";
import { RichText } from "@/builder/components/ui/RichText";
import { SectionBuilder } from "@/builder/components/ui/SectionBuilder";
import { Spacer } from "@/builder/components/ui/Spacer";
import { SubmitButton } from "@/builder/components/ui/SubmitButton";
import { Text } from "@/builder/components/ui/Text";
import { TextField } from "@/builder/components/ui/TextField";
import { Video } from "@/builder/components/ui/Video";
import { useDeleteComponentContext } from "@/builder/contexts/DeleteComponentContext";
import { useDuplicateComponent } from "@/builder/hooks/useDuplicateComponent";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { useStyleClipboardStore } from "@/builder/store/storeStyleClipboard";
import {
	BuilderComponent,
	ComponentType,
} from "@/builder/types/components/components";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

// Default component for types that haven't been implemented yet
const DefaultComponent: React.FC<{ component: BuilderComponent }> = ({
	component,
}) => {
	return (
		<div
			className="relative border border-dashed border-gray-300 p-4 bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
			}}
		>
			<div className="absolute top-0 left-0 bg-gray-500 text-white text-xs px-2 py-1">
				{component.label} (Not implemented)
			</div>
			<div className="mt-6">Component type: {component.type}</div>
		</div>
	);
};

// Component registry mapping component types to React components
const componentMap: Record<
	ComponentType,
	React.FC<{ component: BuilderComponent }>
> = {
	button: Button,
	checkbox: Checkbox,
	cmstemplate: DefaultComponent,
	container: Container,
	divider: DefaultComponent,
	dropdown: Dropdown,
	email: DefaultComponent,
	embed: Embed,
	fileupload: FileUpload,
	formblock: FormBlock,
	grid: Grid,

	// Text & Content components
	heading: Heading,

	// Media components
	image: Image,

	// Form components
	input: DefaultComponent,
	link: Link,
	list: List,
	paragraph: Paragraph,
	radiogroup: RadioGroup,
	richtext: RichText,
	// Layout components
	section: SectionBuilder,
	spacer: Spacer,
	submitbutton: SubmitButton,
	text: Text,
	textarea: DefaultComponent,
	textfield: TextField,
	// Default for undefined
	undefined: DefaultComponent,
	video: Video,
};

interface ComponentRendererProps {
	component: BuilderComponent;
	onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
	onDragLeave?: () => void;
	isDropTarget?: boolean;
}

function updateStyleInTree(
	list: BuilderComponent[],
	targetId: string,
	newStyle: Record<string, unknown>,
): boolean {
	for (const node of list) {
		if (node.id === targetId) {
			node.props = {
				...node.props,
				style: { ...newStyle },
			};
			return true;
		}
		if (
			node.children &&
			updateStyleInTree(
				node.children as BuilderComponent[],
				targetId,
				newStyle,
			)
		) {
			return true;
		}
	}
	return false;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
	component,
	onDragOver,
	onDragLeave,
	isDropTarget,
}) => {
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);
	const setCurrentComponent = useCurrentComponentStore(
		(state) => state.setCurrentComponent,
	);
	const { confirmDelete } = useDeleteComponentContext();
	const { duplicateComponent } = useDuplicateComponent();
	const { clipboard, copy } = useStyleClipboardStore();
	const { currentPage, setCurrentPage } = useCurrentPageStore();

	// Get the component from the registry or use the default component
	const ComponentToRender = componentMap[component.type] || DefaultComponent;

	// Check if this component is the currently selected one
	const isSelected = currentComponent.id === component.id;

	// Determine the appropriate class based on component state
	let className = "";
	if (isSelected) {
		className = "border-2 border-blue-500";
	} else if (isDropTarget) {
		className = "border-2 border-green-500 bg-green-50";
	} else {
		className = "hover:border-2 hover:border-blue-500";
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div
					className={className}
					onClick={(e) => {
						e.stopPropagation(); // Stop event propagation to parent components
						setCurrentComponent(component as BuilderComponent);
					}}
					onDragLeave={onDragLeave}
					onDragOver={onDragOver}
				>
					<ComponentToRender component={component} />
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent onClick={(e) => e.stopPropagation()}>
				<ContextMenuItem
					onClick={(e) => {
						e.stopPropagation();
						duplicateComponent(component.id);
					}}
				>
					Duplicate (Ctrl+D)
				</ContextMenuItem>
				<ContextMenuItem
					onClick={(e) => {
						e.stopPropagation();
						copy(component.props?.style);
					}}
				>
					Copy style
				</ContextMenuItem>
				<ContextMenuItem
					onClick={(e) => {
						e.stopPropagation();
						if (!clipboard) return;
						const working = Array.isArray(currentPage.content)
							? (JSON.parse(
									JSON.stringify(currentPage.content),
								) as BuilderComponent[])
							: [];
						if (
							updateStyleInTree(working, component.id, clipboard)
						) {
							setCurrentPage({
								...currentPage,
								content: working,
							});
						}
					}}
				>
					Paste style
				</ContextMenuItem>
				<ContextMenuItem
					className={"text-destructive"}
					onClick={(e) => {
						e.stopPropagation();
						confirmDelete(component.id, null, component.type);
					}}
				>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};
