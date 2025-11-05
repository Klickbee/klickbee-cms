import React, { JSX } from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface HeadingProps {
	component: BuilderComponent;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: React.DragEventHandler<HTMLElement>;
	onDragOver?: React.DragEventHandler<HTMLElement>;
}

export const Heading: React.FC<HeadingProps> = ({
	component,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	const content = (component.props?.content?.text as string) || "Heading";
	const level: number = (component.props?.content?.level as number) || 2;

	const Tag =
		`h${Math.min(Math.max(level, 1), 6)}` as keyof JSX.IntrinsicElements;
	const style = {
		order: component.order || 0,
		...mapStylePropsToCss(component.props?.style),
	};

	return React.createElement(
		Tag,
		{
			style,
			className,
			onClick: onClick,
			onDragLeave: onDragLeave,
			onDragOver: onDragOver,
		},
		content,
	);
};
