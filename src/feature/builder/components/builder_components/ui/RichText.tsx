import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface RichTextProps {
	component: BuilderComponent;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
	onDragOver?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
}

export const RichText: React.FC<RichTextProps> = ({
	component,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	// Default rich text content if not provided
	const content =
		(component.props?.content?.content as string) ||
		"<p>Rich text content</p>";

	return (
		<div
			className={[" text-gray-700", className].filter(Boolean).join(" ")}
			dangerouslySetInnerHTML={{ __html: content }}
			onClick={onClick}
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
		/>
	);
};
