import React from "react";
import { Container } from "@/builder/components/ui/Container";
import { Grid } from "@/builder/components/ui/Grid";
import { Heading } from "@/builder/components/ui/Heading";
import { Image } from "@/builder/components/ui/Image";
import { Section } from "@/builder/components/ui/Section";
import { Spacer } from "@/builder/components/ui/Spacer";
import { Text } from "@/builder/components/ui/Text";
import { Video } from "@/builder/components/ui/Video";
import {
	BuilderComponent,
	ComponentType,
} from "@/builder/types/components/component";

// Default component for types that haven't been implemented yet
const DefaultComponent: React.FC<{ component: BuilderComponent }> = ({
	component,
}) => {
	return (
		<div
			className="relative border border-dashed border-gray-300 p-4 bg-white"
			style={{
				left: component.position?.x,
				position: component.position ? "absolute" : "relative",
				top: component.position?.y,
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
	container: Container,
	divider: DefaultComponent,
	email: DefaultComponent,
	grid: Grid,
	heading: Heading,
	image: Image,
	input: DefaultComponent,
	section: Section,
	spacer: Spacer,
	text: Text,
	video: Video,
};

interface ComponentRendererProps {
	component: BuilderComponent;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
	component,
}) => {
	// Get the component from the registry or use the default component
	const ComponentToRender = componentMap[component.type] || DefaultComponent;

	return <ComponentToRender component={component} />;
};
