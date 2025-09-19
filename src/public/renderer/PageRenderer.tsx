"use client";

import React from "react";
import { Button } from "@/builder/components/ui/Button";
// Leaf UI components (do not rely on editor-only contexts)
import { Checkbox } from "@/builder/components/ui/Checkbox";
import { Dropdown } from "@/builder/components/ui/Dropdown";
import { Embed } from "@/builder/components/ui/Embed";
import { FileUpload } from "@/builder/components/ui/FileUpload";
import { FormBlock } from "@/builder/components/ui/FormBlock";
import { Heading } from "@/builder/components/ui/Heading";
import { Image } from "@/builder/components/ui/Image";
import { Link as LinkComp } from "@/builder/components/ui/Link";
import { List } from "@/builder/components/ui/List";
import { NavigationMenu } from "@/builder/components/ui/NavigationMenu";
import { Paragraph } from "@/builder/components/ui/Paragraph";
import { RadioGroup } from "@/builder/components/ui/RadioGroup";
import { RichText } from "@/builder/components/ui/RichText";
import { Slider } from "@/builder/components/ui/Slider";
import { Spacer } from "@/builder/components/ui/Spacer";
import { SubmitButton } from "@/builder/components/ui/SubmitButton";
import { Text } from "@/builder/components/ui/Text";
import { TextField } from "@/builder/components/ui/TextField";
import { Video } from "@/builder/components/ui/Video";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import type {
	BuilderComponent,
	ComponentType,
} from "@/builder/types/components/components";

// Public-safe container components (no editor contexts, no placeholders)
function PublicSection({ component }: { component: BuilderComponent }) {
	const style: React.CSSProperties = {
		order: component.order || 0,
		...mapStylePropsToCss(component.props?.style),
	};
	return (
		<section className="w-full" style={style}>
			{Array.isArray(component.children)
				? component.children
						.slice()
						.sort((a, b) => (a.order || 0) - (b.order || 0))
						.map((child) => (
							<PublicComponentRenderer
								component={child}
								key={child.id}
							/>
						))
				: null}
		</section>
	);
}

function PublicContainer({ component }: { component: BuilderComponent }) {
	const style: React.CSSProperties = {
		order: component.order || 0,
		...mapStylePropsToCss(component.props?.style),
	};
	return (
		<div className="max-w-screen-lg mx-auto" style={style}>
			{Array.isArray(component.children)
				? component.children
						.slice()
						.sort((a, b) => (a.order || 0) - (b.order || 0))
						.map((child) => (
							<PublicComponentRenderer
								component={child}
								key={child.id}
							/>
						))
				: null}
		</div>
	);
}

function PublicGrid({ component }: { component: BuilderComponent }) {
	const columns = component.props?.style?.layout?.grid?.columns || 2;
	const style: React.CSSProperties = {
		order: component.order || 0,
		...mapStylePropsToCss(component.props?.style),
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
	};
	return (
		<div className="grid gap-4" style={style}>
			{Array.isArray(component.children)
				? component.children
						.slice()
						.sort((a, b) => (a.order || 0) - (b.order || 0))
						.map((child) => (
							<div key={child.id}>
								<PublicComponentRenderer component={child} />
							</div>
						))
				: null}
		</div>
	);
}

// Fallback: render nothing for unsupported types in public mode
function UnknownPublic({ component }: { component: BuilderComponent }) {
	// Intentionally render nothing on public site for unknown components
	return (
		<div style={{ backgroundColor: "red" }}>
			<h1>not working</h1>
		</div>
	);
}

const publicComponentMap: Record<
	ComponentType,
	React.FC<{ component: BuilderComponent }>
> = {
	button: Button,
	checkbox: Checkbox,

	// CMS
	cmstemplate: UnknownPublic,
	container: PublicContainer,
	divider: UnknownPublic,
	dropdown: Dropdown,
	email: UnknownPublic,
	embed: Embed,
	fileupload: FileUpload,
	formblock: FormBlock,
	grid: PublicGrid,

	// Text & Content
	heading: Heading,

	// Media
	image: Image,

	// Form
	input: UnknownPublic,
	link: LinkComp,
	list: List,
	paragraph: Paragraph,
	radiogroup: RadioGroup,
	richtext: RichText,
	// Layout
	section: PublicSection,
	spacer: Spacer,
	submitbutton: SubmitButton,
	text: Text,
	textarea: UnknownPublic,
	textfield: TextField,
	undefined: UnknownPublic,
	video: Video,
	slider: Slider,
	navigationmenu: NavigationMenu,
};

export function PublicComponentRenderer({
	component,
}: {
	component: BuilderComponent;
}) {
	const Comp = publicComponentMap[component.type] || UnknownPublic;
	return <Comp component={component} />;
}

export function PageRenderer({
	content,
	wrapperClassName,
}: {
	content: unknown;
	wrapperClassName?: string;
}) {
	const rootComponents: BuilderComponent[] = Array.isArray(content)
		? (content as BuilderComponent[])
		: typeof content === "object" &&
				content &&
				Array.isArray(
					(content as { components: BuilderComponent[] }).components,
				)
			? (content as { components: BuilderComponent[] }).components
			: [];

	if (!rootComponents || rootComponents.length === 0) {
		return null;
	}

	return (
		<>
			{rootComponents
				.slice()
				.sort((a, b) => (a.order || 0) - (b.order || 0))
				.map((component) => (
					<PublicComponentRenderer
						component={component}
						key={component.id}
					/>
				))}
		</>
	);
}
