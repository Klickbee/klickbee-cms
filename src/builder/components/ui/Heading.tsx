import React, { JSX } from "react";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../types/components/components";

interface HeadingProps {
	component: BuilderComponent;
}

export const Heading: React.FC<HeadingProps> = ({ component }) => {
	const content = (component.props?.content?.text as string) || "Heading";
	const level: number = (component.props?.content?.level as number) || 2;

	const Tag =
		`h${Math.min(Math.max(level, 1), 6)}` as keyof JSX.IntrinsicElements;
	const style = {
		order: component.order || 0,
		...mapStylePropsToCss(component.props?.style),
	};

	return <Tag style={style}>{content}</Tag>;
};
