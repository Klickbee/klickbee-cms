"use client";

import React, { MouseEventHandler } from "react";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/feature/builder/components/builder_components/ui/Button";
import { Checkbox } from "@/feature/builder/components/builder_components/ui/Checkbox";
import { Container } from "@/feature/builder/components/builder_components/ui/Container";
import { Divider } from "@/feature/builder/components/builder_components/ui/Divider";
import { Dropdown } from "@/feature/builder/components/builder_components/ui/Dropdown";
import { Embed } from "@/feature/builder/components/builder_components/ui/Embed";
import { FileUpload } from "@/feature/builder/components/builder_components/ui/FileUpload";
import { FormBlock } from "@/feature/builder/components/builder_components/ui/FormBlock";
import { Grid } from "@/feature/builder/components/builder_components/ui/Grid";
import { Heading } from "@/feature/builder/components/builder_components/ui/Heading";
import { Image } from "@/feature/builder/components/builder_components/ui/Image";
import { Link } from "@/feature/builder/components/builder_components/ui/Link";
import { List } from "@/feature/builder/components/builder_components/ui/List";
import { NavigationMenu } from "@/feature/builder/components/builder_components/ui/NavigationMenu";
import { Paragraph } from "@/feature/builder/components/builder_components/ui/Paragraph";
import { RadioGroup } from "@/feature/builder/components/builder_components/ui/RadioGroup";
import { RichText } from "@/feature/builder/components/builder_components/ui/RichText";
import { SectionBuilder } from "@/feature/builder/components/builder_components/ui/SectionBuilder";
import { Slider } from "@/feature/builder/components/builder_components/ui/Slider";
import { Spacer } from "@/feature/builder/components/builder_components/ui/Spacer";
import { SubmitButton } from "@/feature/builder/components/builder_components/ui/SubmitButton";
import { Text } from "@/feature/builder/components/builder_components/ui/Text";
import { TextField } from "@/feature/builder/components/builder_components/ui/TextField";
import { Video } from "@/feature/builder/components/builder_components/ui/Video";
import { useDeleteComponentContext } from "@/feature/builder/contexts/DeleteComponentContext";
import { useDuplicateComponent } from "@/feature/builder/hooks/useDuplicateComponent";
import { useCurrentComponentStore } from "@/feature/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { useStyleClipboardStore } from "@/feature/builder/store/storeStyleClipboard";
import {
	BuilderComponent,
	ComponentType,
} from "@/feature/builder/types/components/components";

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
	React.FC<{
		component: BuilderComponent;
		className: string;
		onClick: MouseEventHandler;
		onDragLeave: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
		onDragOver: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
	}>
> = {
	button: Button,
	checkbox: Checkbox,
	cmstemplate: DefaultComponent,
	container: Container,
	divider: Divider,
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
	slider: Slider,
	navigationmenu: NavigationMenu,
};

import { useCurrentBreakpoint } from "@/feature/builder/contexts/BreakpointContext";
import { useActiveBreakpointStore } from "@/feature/builder/store/storeActiveBreakpoint";
import { useFooterEditor } from "@/feature/page/_footer/hooks/useFooterEditor";
import { useHeaderEditor } from "@/feature/page/_header/hooks/useHeaderEditor";

interface ComponentRendererProps {
	component: BuilderComponent;
	onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
	onDragLeave?: () => void;
	onClick?: MouseEventHandler;
	isDropTarget?: boolean;
	isRoot?: boolean;
	region?: "header" | "content" | "footer";
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
	isRoot,
	region = "content",
}) => {
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);
	const setCurrentComponent = useCurrentComponentStore(
		(state) => state.setCurrentComponent,
	);

	const setActiveBreakpoint = useActiveBreakpointStore(
		(state) => state.setActive,
	);

	const activeBreakpoint = useActiveBreakpointStore((state) => state.active);
	const { confirmDelete } = useDeleteComponentContext();
	const { duplicateComponent } = useDuplicateComponent();
	const { clipboard, copy } = useStyleClipboardStore();
	const { currentPage, setCurrentPage } = useCurrentPageStore();
	const pageId =
		currentPage?.id && currentPage.id > 0 ? currentPage.id : undefined;
	const headerEditor = useHeaderEditor(pageId);
	const footerEditor = useFooterEditor(pageId);

	// Get the component from the registry or use the default component
	const ComponentToRender = componentMap[component.type] || DefaultComponent;

	const currentBreakpoint = useCurrentBreakpoint();
	// Check if this component is the currently selected one

	const handleClick: MouseEventHandler = (e) => {
		setActiveBreakpoint(currentBreakpoint);
		e.stopPropagation(); // Stop event propagation to parent components
		setCurrentComponent(component as BuilderComponent);
	};

	const isSelected =
		currentComponent.id === component.id &&
		JSON.stringify(activeBreakpoint) === JSON.stringify(currentBreakpoint);
	// Determine the appropriate class based on component state
	// Use a full-coverage after pseudo-element to avoid layout shifts from borders
	let className =
		"relative after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:z-10 ";
	if (isSelected) {
		className += "after:border-2 after:border-blue-500";
	} else if (isDropTarget) {
		className += " after:border-2 after:border-green-500 bg-green-50";
	} else {
		className += " hover:after:border-2 hover:after:border-blue-500";
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<>
					{component.type === "section" ? (
						<SectionBuilder
							className={className}
							component={component}
							isRoot={!!isRoot}
							onClick={handleClick}
							onDragLeave={onDragLeave}
							onDragOver={onDragOver}
							region={region}
						/>
					) : (
						<ComponentToRender
							className={className}
							component={component}
							onClick={handleClick}
							onDragLeave={onDragLeave}
							onDragOver={onDragOver}
						/>
					)}
				</>
			</ContextMenuTrigger>
			<ContextMenuContent onClick={(e) => e.stopPropagation()}>
				<ContextMenuItem
					onClick={(e) => {
						e.stopPropagation();
						if (region === "header") {
							headerEditor.duplicateComponent(component.id);
						} else if (region === "footer") {
							footerEditor.duplicateComponent(component.id);
						} else {
							duplicateComponent(component.id);
						}
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
					Copy style (Ctrl+Shift+C)
				</ContextMenuItem>
				<ContextMenuItem
					onClick={(e) => {
						e.stopPropagation();
						if (!clipboard) return;
						if (region === "header") {
							headerEditor.pasteStyle(component.id, clipboard);
							return;
						} else if (region === "footer") {
							footerEditor.pasteStyle(component.id, clipboard);
							return;
						}
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
					Paste style (Ctrl+Shift+V)
				</ContextMenuItem>
				<ContextMenuItem
					className={"text-destructive"}
					onClick={(e) => {
						e.stopPropagation();
						if (region === "header") {
							headerEditor.deleteComponent(component.id);
						} else if (region === "footer") {
							footerEditor.deleteComponent(component.id);
						} else {
							confirmDelete(component.id, null, component.type);
						}
					}}
				>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};
