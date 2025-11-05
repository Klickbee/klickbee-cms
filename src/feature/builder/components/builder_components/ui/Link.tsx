import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface LinkProps {
	component: BuilderComponent;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: React.DragEventHandler<HTMLElement>;
	onDragOver?: React.DragEventHandler<HTMLElement>;
}

export const Link: React.FC<LinkProps> = ({
	component,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	// Default link properties if not provided
	const text = (component.props?.content?.text as string) || "Link text";
	const href = (component.props?.content?.href as string) || "#";
	const target = (component.props?.content?.target as string) || "_blank";
	const rel = target === "_blank" ? "noopener noreferrer" : "";

	return (
		<a
			className={["text-blue-600 hover:underline", className]
				.filter(Boolean)
				.join(" ")}
			href={href}
			onClick={onClick}
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			rel={rel}
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
			target={target}
		>
			{text}
		</a>
	);
};
